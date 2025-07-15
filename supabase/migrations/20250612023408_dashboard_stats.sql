create or replace function get_dashboard_stats()
returns table(
  tasks_completed_percentage float,
  total_reports_generated bigint,
  total_documents_generated bigint,
  profile_completeness int
)
language plpgsql
security definer
as $$
declare
  auth_user_id uuid := auth.uid();
  total_tasks bigint;
  completed_tasks bigint;
  profile_fields_completed int := 0;
  total_profile_fields int := 5; -- Assuming 5 key fields for completeness
  user_profile record;
begin
  -- Calculate tasks completed percentage
  select count(*), count(*) filter (where status = 'completed')
  into total_tasks, completed_tasks
  from public.pipeline_tasks
  where user_id = auth_user_id;

  if total_tasks > 0 then
    tasks_completed_percentage := (completed_tasks::float / total_tasks::float) * 100;
  else
    tasks_completed_percentage := 0;
  end if;

  -- Calculate total reports generated
  select count(*)
  into total_reports_generated
  from public.analysis_results
  where user_id = auth_user_id;

  -- Calculate total documents generated
  select count(*)
  into total_documents_generated
  from public.generated_documents
  where user_id = auth_user_id;

  -- Calculate profile completeness
  select * into user_profile from public.user_profiles where id = auth_user_id;
  if user_profile.name is not null then profile_fields_completed := profile_fields_completed + 1; end if;
  if user_profile.education is not null then profile_fields_completed := profile_fields_completed + 1; end if;
  if user_profile.skills is not null and array_length(user_profile.skills, 1) > 0 then profile_fields_completed := profile_fields_completed + 1; end if;
  if user_profile.experience is not null then profile_fields_completed := profile_fields_completed + 1; end if;
  if user_profile.preferred_industries is not null and array_length(user_profile.preferred_industries, 1) > 0 then profile_fields_completed := profile_fields_completed + 1; end if;

  profile_completeness := (profile_fields_completed::float / total_profile_fields::float) * 100;


  return query
  select
    get_dashboard_stats.tasks_completed_percentage,
    get_dashboard_stats.total_reports_generated,
    get_dashboard_stats.total_documents_generated,
    get_dashboard_stats.profile_completeness;
end;
$$; 