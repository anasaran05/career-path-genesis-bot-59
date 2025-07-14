-- Create user_credits table
CREATE TABLE public.user_credits (
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    credits INTEGER NOT NULL DEFAULT 30,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    PRIMARY KEY (user_id)
);

-- Enable Row Level Security
ALTER TABLE public.user_credits ENABLE ROW LEVEL SECURITY;

-- RLS Policies for user_credits
CREATE POLICY "Users can view their own credits"
    ON public.user_credits
    FOR SELECT
    USING (auth.uid() = user_id);

CREATE POLICY "Users can update their own credits"
    ON public.user_credits
    FOR UPDATE
    USING (auth.uid() = user_id);

-- Modify the handle_new_user function to also create credits
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER SET search_path = ''
AS $$
BEGIN
  -- Insert into profiles (existing code)
  INSERT INTO public.profiles (id, email, full_name, user_type)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data ->> 'full_name', NEW.email),
    COALESCE(NEW.raw_user_meta_data ->> 'user_type', 'student')
  );
  
  -- Create specific profile based on user type (existing code)
  IF (NEW.raw_user_meta_data ->> 'user_type') = 'recruiter' THEN
    INSERT INTO public.recruiter_profiles (id, company_name)
    VALUES (NEW.id, COALESCE(NEW.raw_user_meta_data ->> 'company_name', 'Unknown Company'));
  ELSE
    INSERT INTO public.student_profiles (id)
    VALUES (NEW.id);
  END IF;
  
  -- Add initial credits for new users
  INSERT INTO public.user_credits (user_id)
  VALUES (NEW.id);
  
  RETURN NEW;
END;
$$; 