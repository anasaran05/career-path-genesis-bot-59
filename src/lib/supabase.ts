
import { createClient } from '@supabase/supabase-js'

const SUPABASE_URL = "https://zzsxugznfrsikuttivui.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inp6c3h1Z3puZnJzaWt1dHRpdnVpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTI0MDA0MzIsImV4cCI6MjA2Nzk3NjQzMn0.9xkdWHwTDwEWo7eA_UTFUqsw4UYSmtKeziZxJWWeYFk";

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
  auth: {
    storage: localStorage,
    persistSession: true,
    autoRefreshToken: true,
  }
});
