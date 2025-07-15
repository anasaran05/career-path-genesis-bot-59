import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'
import { corsHeaders } from '../_shared/cors.ts'

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }
  try {
    const { userId } = await req.json()
    console.log("Generating advisory report for:", userId)

    // Dummy data for skill gaps and roadmap
    const report = {
      skillGaps: ["React Hooks", "State Management (Redux/Zustand)", "TypeScript"],
      roadmap: [
        "Complete a course on Advanced React.",
        "Build 3 projects using TypeScript.",
        "Contribute to an open-source project.",
        "Get a certification in AWS.",
      ]
    }

    return new Response(JSON.stringify(report), {
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