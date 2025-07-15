
-- Update user_profiles table to include all intake form fields
ALTER TABLE public.user_profiles ADD COLUMN IF NOT EXISTS phone text;
ALTER TABLE public.user_profiles ADD COLUMN IF NOT EXISTS location text;
ALTER TABLE public.user_profiles ADD COLUMN IF NOT EXISTS career_goals text;
ALTER TABLE public.user_profiles ADD COLUMN IF NOT EXISTS salary_expectation text;
ALTER TABLE public.user_profiles ADD COLUMN IF NOT EXISTS work_style text;
ALTER TABLE public.user_profiles ADD COLUMN IF NOT EXISTS graduation_status text DEFAULT 'not_graduated';
ALTER TABLE public.user_profiles ADD COLUMN IF NOT EXISTS projects jsonb DEFAULT '[]'::jsonb;
ALTER TABLE public.user_profiles ADD COLUMN IF NOT EXISTS updated_at timestamp with time zone DEFAULT now();

-- Create analysis_results table if it doesn't exist or update it
CREATE TABLE IF NOT EXISTS public.analysis_results (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  user_name text,
  industry_name text,
  current_eligible_roles jsonb,
  post_graduation_roles jsonb,
  skill_gaps text[],
  priority_skills text[],
  upskilling_roadmap jsonb,
  created_at timestamp with time zone DEFAULT now()
);

-- Enable RLS on analysis_results
ALTER TABLE public.analysis_results ENABLE ROW LEVEL SECURITY;

-- Create policy for analysis_results
DROP POLICY IF EXISTS "Users can manage their own analysis results" ON public.analysis_results;
CREATE POLICY "Users can manage their own analysis results" ON public.analysis_results
  FOR ALL USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);

-- Create user_onboarding_status table to track user progress
CREATE TABLE IF NOT EXISTS public.user_onboarding_status (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE UNIQUE,
  has_completed_intake boolean DEFAULT false,
  has_completed_analysis boolean DEFAULT false,
  has_completed_advisory boolean DEFAULT false,
  last_updated timestamp with time zone DEFAULT now()
);

-- Enable RLS on user_onboarding_status
ALTER TABLE public.user_onboarding_status ENABLE ROW LEVEL SECURITY;

-- Create policy for user_onboarding_status
CREATE POLICY "Users can manage their own onboarding status" ON public.user_onboarding_status
  FOR ALL USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);

-- Update the user credits deduction function
CREATE OR REPLACE FUNCTION public.deduct_user_credits(p_user_id uuid, p_amount int)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  UPDATE public.user_credits
  SET used_credits = used_credits + p_amount,
      updated_at = now()
  WHERE user_id = p_user_id;
  
  -- If no row was updated, insert a new one
  IF NOT FOUND THEN
    INSERT INTO public.user_credits (user_id, used_credits, total_credits)
    VALUES (p_user_id, p_amount, 30);
  END IF;
END;
$$;

-- Function to initialize user onboarding status
CREATE OR REPLACE FUNCTION public.initialize_user_onboarding()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  INSERT INTO public.user_onboarding_status (user_id)
  VALUES (NEW.user_id)
  ON CONFLICT (user_id) DO NOTHING;
  RETURN NEW;
END;
$$;

-- Trigger to initialize onboarding status when user_credits is created
DROP TRIGGER IF EXISTS on_user_credits_created ON public.user_credits;
CREATE TRIGGER on_user_credits_created
  AFTER INSERT ON public.user_credits
  FOR EACH ROW EXECUTE FUNCTION public.initialize_user_onboarding();
