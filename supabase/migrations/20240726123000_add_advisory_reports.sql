-- Create advisory_reports table
CREATE TABLE IF NOT EXISTS public.advisory_reports (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  industry text,
  report_data jsonb NOT NULL,
  created_at timestamp with time zone DEFAULT now()
);

-- RLS for advisory_reports
ALTER TABLE public.advisory_reports ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can view their own advisory reports" ON public.advisory_reports FOR SELECT
  USING (auth.uid() = user_id);

-- Update user_credits table to use total_credits and used_credits
ALTER TABLE public.user_credits ADD COLUMN IF NOT EXISTS total_credits INT NOT NULL DEFAULT 30;
ALTER TABLE public.user_credits ADD COLUMN IF NOT EXISTS used_credits INT NOT NULL DEFAULT 0;
ALTER TABLE public.user_credits DROP COLUMN IF EXISTS credits;

-- Create function to deduct credits
CREATE OR REPLACE FUNCTION public.deduct_credits(user_id_input uuid, deduction_amount int)
RETURNS json
LANGUAGE plpgsql
SECURITY DEFINER SET search_path = public
AS $$
DECLARE
  current_total_credits int;
  current_used_credits int;
BEGIN
  -- Select credits in a lock to prevent race conditions
  SELECT total_credits, used_credits
  INTO current_total_credits, current_used_credits
  FROM public.user_credits
  WHERE user_id = user_id_input
  FOR UPDATE;

  -- Check if user has enough credits
  IF (current_total_credits - current_used_credits) < deduction_amount THEN
    RAISE EXCEPTION 'Insufficient credits';
  END IF;

  -- Deduct credits
  UPDATE public.user_credits
  SET used_credits = current_used_credits + deduction_amount
  WHERE user_id = user_id_input;

  -- Return new credit balance
  RETURN json_build_object(
    'total_credits', current_total_credits,
    'used_credits', current_used_credits + deduction_amount
  );
END;
$$; 