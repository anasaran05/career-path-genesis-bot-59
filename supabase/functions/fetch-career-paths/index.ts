import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'
import { corsHeaders } from '../_shared/cors.ts'

interface CareerPath {
  id: string
  industry: string
  role_title: string
  role_level: string
  required_skills: string[]
  recommended_skills: string[]
  min_salary: number
  max_salary: number
  growth_rate: number
  job_outlook: string
  education_requirements: string[]
  experience_years: number
}

interface UserProfile {
  education: string[]
  skills: string[]
  experience: string[]
}

serve(async (req) => {
  // Handle CORS
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_ANON_KEY') ?? ''
    )

    // Get request data
    const { industry, userId } = await req.json()

    if (!industry || !userId) {
      return new Response(
        JSON.stringify({ error: 'Industry and userId are required' }),
        {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          status: 400,
        }
      )
    }

    // Fetch career paths for the selected industry
    const { data: careerPaths, error: careerPathsError } = await supabase
      .from('career_paths')
      .select('*')
      .eq('industry', industry)

    if (careerPathsError) {
      throw careerPathsError
    }

    // Fetch user profile for skill matching
    const { data: userProfile, error: userProfileError } = await supabase
      .from('user_profiles')
      .select('education, skills, experience')
      .eq('id', userId)
      .single()

    if (userProfileError) {
      throw userProfileError
    }

    // Calculate match scores and enrich career paths data
    const enrichedCareerPaths = careerPaths.map((path: CareerPath) => {
      const matchScore = calculateMatchScore(path, userProfile)
      return {
        ...path,
        matchScore,
        salaryRange: `$${path.min_salary.toLocaleString()} - $${path.max_salary.toLocaleString()}`,
        growthIndicator: getGrowthIndicator(path.growth_rate),
      }
    })

    // Sort by match score
    enrichedCareerPaths.sort((a, b) => b.matchScore - a.matchScore)

    return new Response(
      JSON.stringify({
        careerPaths: enrichedCareerPaths,
        totalPaths: enrichedCareerPaths.length,
        topMatch: enrichedCareerPaths[0],
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      }
    )
  } catch (error) {
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500,
      }
    )
  }
})

function calculateMatchScore(careerPath: CareerPath, userProfile: UserProfile): number {
  let score = 0
  const maxScore = 100

  // Skills match (50% of total score)
  const userSkills = new Set(userProfile.skills.map(s => s.toLowerCase()))
  const requiredSkills = new Set(careerPath.required_skills.map(s => s.toLowerCase()))
  const recommendedSkills = new Set(careerPath.recommended_skills.map(s => s.toLowerCase()))

  const requiredMatches = [...requiredSkills].filter(skill => userSkills.has(skill)).length
  const recommendedMatches = [...recommendedSkills].filter(skill => userSkills.has(skill)).length

  score += (requiredMatches / requiredSkills.size) * 30
  score += (recommendedMatches / recommendedSkills.size) * 20

  // Education match (30% of total score)
  const userEducation = new Set(userProfile.education.map(e => e.toLowerCase()))
  const requiredEducation = new Set(careerPath.education_requirements.map(e => e.toLowerCase()))
  
  const educationMatches = [...requiredEducation].some(edu => 
    [...userEducation].some(userEdu => userEdu.includes(edu))
  )
  
  if (educationMatches) score += 30

  // Experience match (20% of total score)
  const userExperience = userProfile.experience.length
  if (userExperience >= careerPath.experience_years) {
    score += 20
  } else if (userExperience > 0) {
    score += (userExperience / careerPath.experience_years) * 20
  }

  return Math.round(score)
}

function getGrowthIndicator(growthRate: number): string {
  if (growthRate >= 10) return 'High Growth'
  if (growthRate >= 5) return 'Moderate Growth'
  return 'Stable'
} 