import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';
import { corsHeaders } from '../_shared/cors.ts';

// Main function to handle career path analysis
async function analyzeCareerPath(supabaseClient, userId, industry) {
  // Fetch user profile
  const { data: userProfile, error: profileError } = await supabaseClient
    .from('user_profiles')
    .select('*')
    .eq('id', userId)
    .single();

  if (profileError) throw new Error(`Error fetching user profile: ${profileError.message}`);

  // Fetch all career paths for the user's preferred industry
  const { data: careerPaths, error: pathsError } = await supabaseClient
    .from('career_paths')
    .select('*')
    .eq('industry', industry);

  if (pathsError) throw new Error(`Error fetching career paths: ${pathsError.message}`);

  // Combine user's technical and soft skills
  const userSkills = [
    ...(userProfile.technical_skills || []),
    ...(userProfile.soft_skills || []),
  ];

  // Determine user's graduation status from their education details
  const isGraduated = userProfile.education?.some(edu => edu.completionStatus === 'completed') || false;

  // Analyze and categorize roles
  const immediateRoles = [];
  const futureRoles = [];

  for (const path of careerPaths) {
    // Check if the user meets the required skills for a role
    const metSkills = path.required_skills.filter(skill => userSkills.includes(skill)).length;
    const skillMatchPercentage = (metSkills / path.required_skills.length) * 100;

    // Logic to categorize roles based on user's profile
    if (isGraduated) {
      if (skillMatchPercentage >= 75) {
        immediateRoles.push({ ...path, skillMatchPercentage });
      } else {
        futureRoles.push({ ...path, skillMatchPercentage });
      }
    } else {
      // For non-graduates, entry-level roles with some skill match are considered immediate
      if (path.role_level === 'Entry Level' && skillMatchPercentage >= 50) {
        immediateRoles.push({ ...path, skillMatchPercentage });
      } else {
        futureRoles.push({ ...path, skillMatchPercentage });
      }
    }
  }

  // Return the categorized roles
  return { immediateRoles, futureRoles };
}

// Edge function request handler
Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const { userId, industry } = await req.json();
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_ANON_KEY') ?? '',
      { global: { headers: { Authorization: req.headers.get('Authorization')! } } }
    );

    const data = await analyzeCareerPath(supabaseClient, userId, industry);

    return new Response(JSON.stringify(data), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 200,
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 400,
    });
  }
});
