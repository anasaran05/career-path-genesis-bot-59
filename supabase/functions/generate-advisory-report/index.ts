import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';
import { corsHeaders } from '../_shared/cors.ts';

const ADVISORY_REPORT_COST = 10;

async function generateAdvisoryReport(supabaseClient, userId) {
  // 1. Check user credits in a transaction
  const { data: userCredits, error: creditError } = await supabaseClient.rpc('deduct_credits', {
    user_id_input: userId,
    deduction_amount: ADVISORY_REPORT_COST
  });

  if (creditError) {
    throw new Error(creditError.message);
  }

  // 2. Fetch user profile for analysis
  const { data: userProfile, error: profileError } = await supabaseClient
    .from('user_profiles')
    .select('*')
    .eq('id', userId)
    .single();

  if (profileError) throw new Error(`Error fetching user profile: ${profileError.message}`);

  // 3. Generate the report (mock implementation)
  // In a real scenario, this would involve complex logic or calls to an AI service
  const skillGaps = ['Advanced State Management', 'UI/UX Design Principles', 'DevOps Basics'];
  const roadmap = [
    'Complete a course on Advanced React Hooks.',
    'Build a project with a focus on responsive design.',
    'Learn to deploy a simple application using Docker.'
  ];
  const recommendations = [
    { type: 'course', title: 'Advanced React on Coursera' },
    { type: 'certification', title: 'Certified Frontend Developer' }
  ];
  
  const report = {
    skillGaps,
    roadmap,
    recommendations,
    generatedAt: new Date().toISOString()
  };

  // 4. Store the generated report
  const { data: storedReport, error: storeError } = await supabaseClient
    .from('advisory_reports')
    .insert({
      user_id: userId,
      report_data: report,
      industry: userProfile.preferred_industry
    })
    .select()
    .single();

  if (storeError) {
    // Note: Consider how to handle this - maybe refund credits?
    // For now, we'll just throw an error.
    throw new Error(`Failed to store advisory report: ${storeError.message}`);
  }

  return storedReport;
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const { userId } = await req.json();
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_ANON_KEY') ?? '',
      { global: { headers: { Authorization: req.headers.get('Authorization')! } } }
    );

    const report = await generateAdvisoryReport(supabaseClient, userId);

    return new Response(JSON.stringify(report), {
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
