-- Add new columns to tasks table for detailed steps

ALTER TABLE tasks ADD COLUMN IF NOT EXISTS detailed_steps TEXT[];
ALTER TABLE tasks ADD COLUMN IF NOT EXISTS cost_details TEXT;
ALTER TABLE tasks ADD COLUMN IF NOT EXISTS timeline_details TEXT;

-- ------------------------------
-- Security hardening (RLS)
-- ------------------------------

-- Ensure RLS is enabled and enforced
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE tasks ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_tasks ENABLE ROW LEVEL SECURITY;
ALTER TABLE licenses ENABLE ROW LEVEL SECURITY;
ALTER TABLE inspections ENABLE ROW LEVEL SECURITY;

ALTER TABLE profiles FORCE ROW LEVEL SECURITY;
ALTER TABLE tasks FORCE ROW LEVEL SECURITY;
ALTER TABLE user_tasks FORCE ROW LEVEL SECURITY;
ALTER TABLE licenses FORCE ROW LEVEL SECURITY;
ALTER TABLE inspections FORCE ROW LEVEL SECURITY;

-- Ensure least-privilege grants for API roles
REVOKE ALL ON TABLE profiles FROM anon, authenticated;
REVOKE ALL ON TABLE tasks FROM anon, authenticated;
REVOKE ALL ON TABLE user_tasks FROM anon, authenticated;
REVOKE ALL ON TABLE licenses FROM anon, authenticated;
REVOKE ALL ON TABLE inspections FROM anon, authenticated;

GRANT SELECT, INSERT, UPDATE ON TABLE profiles TO authenticated;
GRANT SELECT ON TABLE tasks TO authenticated;
GRANT SELECT, INSERT, UPDATE, DELETE ON TABLE user_tasks TO authenticated;
GRANT SELECT, INSERT, UPDATE, DELETE ON TABLE licenses TO authenticated;
GRANT SELECT, INSERT, UPDATE, DELETE ON TABLE inspections TO authenticated;

-- Replace update policies with safer WITH CHECK variants
DROP POLICY IF EXISTS "Users can update own profile" ON profiles;
CREATE POLICY "Users can update own profile" ON profiles
	FOR UPDATE USING (auth.uid() = id)
	WITH CHECK (auth.uid() = id);

DROP POLICY IF EXISTS "Users can update own user_tasks" ON user_tasks;
CREATE POLICY "Users can update own user_tasks" ON user_tasks
	FOR UPDATE USING (auth.uid() = user_id)
	WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can update own licenses" ON licenses;
CREATE POLICY "Users can update own licenses" ON licenses
	FOR UPDATE USING (auth.uid() = user_id)
	WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can update own inspections" ON inspections;
CREATE POLICY "Users can update own inspections" ON inspections
	FOR UPDATE USING (auth.uid() = user_id)
	WITH CHECK (auth.uid() = user_id);

-- Secure SECURITY DEFINER trigger function against search_path attacks
ALTER FUNCTION public.handle_new_user() SET search_path = public;
