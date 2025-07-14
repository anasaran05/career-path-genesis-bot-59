-- Create user_profiles table
CREATE TABLE IF NOT EXISTS public.user_profiles (
  id uuid PRIMARY KEY NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  email text,
  name text,
  phone text,
  location text,
  education jsonb,
  skills text[],
  experience jsonb,
  preferred_industries text[],
  preferred_locations text[],
  certifications jsonb,
  projects jsonb,
  career_goals text,
  salary_expectation text,
  work_style text,
  updated_at timestamp with time zone DEFAULT now()
);

-- Create analysis_results table
CREATE TABLE IF NOT EXISTS public.analysis_results (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  user_name text,
  industry_name text,
  recommended_careers jsonb,
  priority_skills text[],
  created_at timestamp with time zone DEFAULT now()
);

-- Create generated_documents table
CREATE TABLE IF NOT EXISTS public.generated_documents (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  job_id text,
  type text,
  url text,
  generated_at timestamp with time zone DEFAULT now()
);

-- Create user_credits table
CREATE TABLE IF NOT EXISTS public.user_credits (
  user_id uuid PRIMARY KEY NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  credits integer NOT NULL DEFAULT 0
);

-- RLS for user_profiles
ALTER TABLE public.user_profiles ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can manage their own profile" ON public.user_profiles FOR ALL
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

-- RLS for analysis_results
ALTER TABLE public.analysis_results ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can view their own analysis results" ON public.analysis_results FOR SELECT
  USING (auth.uid() = user_id);

-- RLS for generated_documents
ALTER TABLE public.generated_documents ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can manage their own documents" ON public.generated_documents FOR ALL
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);
  
-- RLS for user_credits
ALTER TABLE public.user_credits ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can view their own credits" ON public.user_credits FOR SELECT
  USING (auth.uid() = user_id);

-- Function to add initial credits for a new user
CREATE OR REPLACE FUNCTION public.add_initial_credits()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER SET search_path = public
AS $$
BEGIN
  INSERT INTO public.user_credits (user_id, credits)
  VALUES (NEW.id, 30);
  RETURN NEW;
END;
$$;

-- Trigger to add credits on new user signup
DROP TRIGGER IF EXISTS on_auth_user_created_add_credits ON auth.users;
CREATE TRIGGER on_auth_user_created_add_credits
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.add_initial_credits(); 