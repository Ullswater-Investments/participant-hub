
-- Drop the permissive SELECT policy on app_settings
DROP POLICY IF EXISTS "Anyone can read settings" ON public.app_settings;

-- No public policy = no anon access. Only service_role can read.
