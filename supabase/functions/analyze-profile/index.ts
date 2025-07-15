import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'
import { corsHeaders } from '../_shared/cors.ts'

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }
  try {
    const { userId } = await req.json()
    console.log("Analyzing profile for:", userId)

    // In a real app, you'd fetch user data and run a complex analysis.
    // Here, we'll return dummy data.
    const analysis = {
      current: ["Junior QA Tester", "IT Support Specialist"],
      postGrad: ["Software Engineer", "Data Analyst", "Cybersecurity Specialist"]
    }

    return new Response(JSON.stringify(analysis), {
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