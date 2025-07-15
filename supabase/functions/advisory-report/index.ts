
import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'
import { corsHeaders } from '../_shared/cors.ts'

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const { userId } = await req.json()
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '',
    )

    // Fetch user profile
    const { data: profile, error: profileError } = await supabase
      .from('user_profiles')
      .select('*')
      .eq('id', userId)
      .single()

    if (profileError) {
      throw new Error('User profile not found')
    }

    // Fetch career insights to determine required skills
    const { data: careerInsights, error: careerError } = await supabase
      .from('career_insights')
      .select('*')
      .in('industry_key', profile.preferred_industries || [])

    const userSkills = profile.skills || []
    const requiredSkills = []
    const skillGaps = []

    if (careerInsights) {
      careerInsights.forEach(insight => {
        if (insight.required_skills) {
          insight.required_skills.forEach(skill => {
            if (!requiredSkills.includes(skill)) {
              requiredSkills.push(skill)
            }
            if (!userSkills.includes(skill) && !skillGaps.includes(skill)) {
              skillGaps.push(skill)
            }
          })
        }
      })
    }

    // Generate upskilling roadmap
    const roadmap = []
    if (skillGaps.length > 0) {
      roadmap.push('Complete online courses for missing technical skills')
      roadmap.push('Build projects to demonstrate practical knowledge')
      roadmap.push('Obtain relevant certifications')
      roadmap.push('Gain hands-on experience through internships')
      roadmap.push('Network with professionals in your field')
    }

    // Check if user has projects and certifications
    const hasProjects = profile.projects && Array.isArray(profile.projects) && profile.projects.length > 0
    const hasCertifications = profile.certifications && Object.keys(profile.certifications).length > 0

    if (!hasProjects) {
      roadmap.unshift('Build and showcase relevant projects')
    }
    if (!hasCertifications) {
      roadmap.unshift('Obtain industry-relevant certifications')
    }

    return new Response(JSON.stringify({
      skillGaps,
      roadmap,
      requiredSkills,
      hasProjects,
      hasCertifications
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 200,
    })
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 400,
    })
  }
})
