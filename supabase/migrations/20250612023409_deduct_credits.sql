create or replace function deduct_user_credits(p_user_id uuid, p_amount int)
returns void
language plpgsql
security definer
as $$
begin
  update public.user_credits
  set used_credits = used_credits + p_amount
  where user_id = p_user_id;
end;
$$; 