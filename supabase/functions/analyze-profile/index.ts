
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

    // Fetch career insights based on user's preferred industries
    const { data: careerInsights, error: careerError } = await supabase
      .from('career_insights')
      .select('*')
      .in('industry_key', profile.preferred_industries || [])

    if (careerError) {
      console.error('Error fetching career insights:', careerError)
    }

    // Analyze based on graduation status and preferred industries
    const isGraduated = profile.graduation_status === 'graduated'
    const currentRoles = []
    const postGradRoles = []

    if (careerInsights) {
      careerInsights.forEach(insight => {
        if (isGraduated) {
          if (insight.job_title.toLowerCase().includes('senior') || 
              insight.job_title.toLowerCase().includes('lead') ||
              insight.job_title.toLowerCase().includes('manager')) {
            postGradRoles.push(insight.job_title)
          } else {
            currentRoles.push(insight.job_title)
          }
        } else {
          if (insight.job_title.toLowerCase().includes('intern') ||
              insight.job_title.toLowerCase().includes('assistant') ||
              insight.job_title.toLowerCase().includes('trainee')) {
            currentRoles.push(insight.job_title)
          } else {
            postGradRoles.push(insight.job_title)
          }
        }
      })
    }

    // Save analysis results
    const { error: saveError } = await supabase
      .from('analysis_results')
      .insert({
        user_id: userId,
        user_name: profile.name,
        industry_name: profile.preferred_industries?.[0] || 'General',
        current_eligible_roles: currentRoles,
        post_graduation_roles: postGradRoles,
        skill_gaps: [],
        priority_skills: profile.skills || [],
        upskilling_roadmap: []
      })

    if (saveError) {
      console.error('Error saving analysis:', saveError)
    }

    return new Response(JSON.stringify({
      current: currentRoles,
      postGrad: postGradRoles,
      userProfile: profile
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
