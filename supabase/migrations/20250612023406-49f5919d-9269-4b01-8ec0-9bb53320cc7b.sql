
-- Create user profiles table with role-based access
CREATE TABLE public.profiles (
  id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT NOT NULL,
  full_name TEXT,
  user_type TEXT NOT NULL CHECK (user_type IN ('student', 'recruiter')),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  
  PRIMARY KEY (id)
);

-- Create student profiles table for additional student-specific data
CREATE TABLE public.student_profiles (
  id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  graduation_year INTEGER,
  degree TEXT,
  university TEXT,
  skills TEXT[],
  experience_level TEXT,
  career_interests TEXT[],
  
  PRIMARY KEY (id)
);

-- Create recruiter profiles table for company/recruiter data
CREATE TABLE public.recruiter_profiles (
  id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  company_name TEXT NOT NULL,
  company_size TEXT,
  industry TEXT,
  position TEXT,
  company_website TEXT,
  
  PRIMARY KEY (id)
);

-- Create jobs table for job postings
CREATE TABLE public.jobs (
  id UUID NOT NULL DEFAULT gen_random_uuid(),
  recruiter_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  company TEXT NOT NULL,
  location TEXT NOT NULL,
  job_type TEXT NOT NULL,
  experience_level TEXT NOT NULL,
  salary_range TEXT,
  description TEXT NOT NULL,
  requirements TEXT[],
  benefits TEXT[],
  status TEXT NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'paused', 'closed')),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  
  PRIMARY KEY (id)
);

-- Create job applications table
CREATE TABLE public.job_applications (
  id UUID NOT NULL DEFAULT gen_random_uuid(),
  job_id UUID NOT NULL REFERENCES public.jobs(id) ON DELETE CASCADE,
  student_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  status TEXT NOT NULL DEFAULT 'applied' CHECK (status IN ('applied', 'reviewed', 'shortlisted', 'interviewed', 'rejected', 'hired')),
  cover_letter TEXT,
  resume_url TEXT,
  applied_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  
  PRIMARY KEY (id),
  UNIQUE(job_id, student_id)
);

-- Enable Row Level Security
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.student_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.recruiter_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.jobs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.job_applications ENABLE ROW LEVEL SECURITY;

-- RLS Policies for profiles
CREATE POLICY "Users can view their own profile" ON public.profiles
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update their own profile" ON public.profiles
  FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Users can insert their own profile" ON public.profiles
  FOR INSERT WITH CHECK (auth.uid() = id);

-- RLS Policies for student_profiles
CREATE POLICY "Students can manage their own profile" ON public.student_profiles
  FOR ALL USING (auth.uid() = id);

-- RLS Policies for recruiter_profiles
CREATE POLICY "Recruiters can manage their own profile" ON public.recruiter_profiles
  FOR ALL USING (auth.uid() = id);

-- RLS Policies for jobs
CREATE POLICY "Recruiters can manage their own jobs" ON public.jobs
  FOR ALL USING (auth.uid() = recruiter_id);

CREATE POLICY "Everyone can view active jobs" ON public.jobs
  FOR SELECT USING (status = 'active');

-- RLS Policies for job_applications
CREATE POLICY "Students can manage their own applications" ON public.job_applications
  FOR ALL USING (auth.uid() = student_id);

CREATE POLICY "Recruiters can view applications for their jobs" ON public.job_applications
  FOR SELECT USING (
    auth.uid() IN (
      SELECT recruiter_id FROM public.jobs WHERE id = job_applications.job_id
    )
  );

-- Create function to handle new user signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER SET search_path = ''
AS $$
BEGIN
  INSERT INTO public.profiles (id, email, full_name, user_type)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data ->> 'full_name', NEW.email),
    COALESCE(NEW.raw_user_meta_data ->> 'user_type', 'student')
  );
  
  -- Create specific profile based on user type
  IF (NEW.raw_user_meta_data ->> 'user_type') = 'recruiter' THEN
    INSERT INTO public.recruiter_profiles (id, company_name)
    VALUES (NEW.id, COALESCE(NEW.raw_user_meta_data ->> 'company_name', 'Unknown Company'));
  ELSE
    INSERT INTO public.student_profiles (id)
    VALUES (NEW.id);
  END IF;
  
  RETURN NEW;
END;
$$;

-- Create trigger for new user signup
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();
