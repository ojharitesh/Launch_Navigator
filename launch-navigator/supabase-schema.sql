-- BizMap Database Schema
-- Run this SQL in your Supabase SQL Editor to set up the database

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create profiles table (extends auth.users)
CREATE TABLE IF NOT EXISTS profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    name TEXT,
    state TEXT NOT NULL,
    city TEXT NOT NULL,
    business_type TEXT NOT NULL DEFAULT 'general',
    subscription_plan TEXT NOT NULL DEFAULT 'free',
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create tasks table (template tasks)
CREATE TABLE IF NOT EXISTS tasks (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title TEXT NOT NULL,
    description TEXT,
    state TEXT NOT NULL,
    business_type TEXT NOT NULL DEFAULT 'general',
    cost_estimate TEXT,
    timeline_estimate TEXT,
    required_documents TEXT[],
    official_link TEXT,
    category TEXT NOT NULL,
    "order" INTEGER DEFAULT 0
);

-- Create user_tasks table (user's assigned tasks)
CREATE TABLE IF NOT EXISTS user_tasks (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
    task_id UUID REFERENCES tasks(id) ON DELETE CASCADE,
    completed BOOLEAN DEFAULT FALSE,
    completed_at TIMESTAMPTZ,
    UNIQUE(user_id, task_id)
);

-- Create licenses table
CREATE TABLE IF NOT EXISTS licenses (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
    license_name TEXT NOT NULL,
    expiration_date DATE NOT NULL,
    renewal_frequency TEXT DEFAULT 'annual',
    notes TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create inspections table
CREATE TABLE IF NOT EXISTS inspections (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
    inspection_type TEXT NOT NULL,
    last_inspection_date DATE,
    next_inspection_estimate DATE,
    notes TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create contact_messages table
CREATE TABLE IF NOT EXISTS contact_messages (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES profiles(id) ON DELETE SET NULL,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    subject TEXT NOT NULL,
    message TEXT NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable Row Level Security (RLS)
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE tasks ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_tasks ENABLE ROW LEVEL SECURITY;
ALTER TABLE licenses ENABLE ROW LEVEL SECURITY;
ALTER TABLE inspections ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_messages ENABLE ROW LEVEL SECURITY;

-- Enforce RLS even for table owners
ALTER TABLE profiles FORCE ROW LEVEL SECURITY;
ALTER TABLE tasks FORCE ROW LEVEL SECURITY;
ALTER TABLE user_tasks FORCE ROW LEVEL SECURITY;
ALTER TABLE licenses FORCE ROW LEVEL SECURITY;
ALTER TABLE inspections FORCE ROW LEVEL SECURITY;
ALTER TABLE contact_messages FORCE ROW LEVEL SECURITY;

-- Least-privilege grants for API roles
REVOKE ALL ON TABLE profiles FROM anon, authenticated;
REVOKE ALL ON TABLE tasks FROM anon, authenticated;
REVOKE ALL ON TABLE user_tasks FROM anon, authenticated;
REVOKE ALL ON TABLE licenses FROM anon, authenticated;
REVOKE ALL ON TABLE inspections FROM anon, authenticated;
REVOKE ALL ON TABLE contact_messages FROM anon, authenticated;

GRANT SELECT, INSERT, UPDATE ON TABLE profiles TO authenticated;
GRANT SELECT ON TABLE tasks TO authenticated;
GRANT SELECT, INSERT, UPDATE, DELETE ON TABLE user_tasks TO authenticated;
GRANT SELECT, INSERT, UPDATE, DELETE ON TABLE licenses TO authenticated;
GRANT SELECT, INSERT, UPDATE, DELETE ON TABLE inspections TO authenticated;
GRANT INSERT, SELECT ON TABLE contact_messages TO authenticated;

-- Profiles policies
DROP POLICY IF EXISTS "Users can view own profile" ON profiles;
CREATE POLICY "Users can view own profile" ON profiles
    FOR SELECT USING (auth.uid() = id);

DROP POLICY IF EXISTS "Users can update own profile" ON profiles;
CREATE POLICY "Users can update own profile" ON profiles
    FOR UPDATE USING (auth.uid() = id)
    WITH CHECK (auth.uid() = id);

DROP POLICY IF EXISTS "Users can insert own profile" ON profiles;
CREATE POLICY "Users can insert own profile" ON profiles
    FOR INSERT WITH CHECK (auth.uid() = id);

-- Tasks policies (read-only for authenticated users)
DROP POLICY IF EXISTS "Authenticated users can view tasks" ON tasks;
CREATE POLICY "Authenticated users can view tasks" ON tasks
    FOR SELECT TO authenticated USING (true);

-- User tasks policies
DROP POLICY IF EXISTS "Users can view own user_tasks" ON user_tasks;
CREATE POLICY "Users can view own user_tasks" ON user_tasks
    FOR SELECT USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can insert own user_tasks" ON user_tasks;
CREATE POLICY "Users can insert own user_tasks" ON user_tasks
    FOR INSERT WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can update own user_tasks" ON user_tasks;
CREATE POLICY "Users can update own user_tasks" ON user_tasks
    FOR UPDATE USING (auth.uid() = user_id)
    WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can delete own user_tasks" ON user_tasks;
CREATE POLICY "Users can delete own user_tasks" ON user_tasks
    FOR DELETE USING (auth.uid() = user_id);

-- Licenses policies
DROP POLICY IF EXISTS "Users can view own licenses" ON licenses;
CREATE POLICY "Users can view own licenses" ON licenses
    FOR SELECT USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can insert own licenses" ON licenses;
CREATE POLICY "Users can insert own licenses" ON licenses
    FOR INSERT WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can update own licenses" ON licenses;
CREATE POLICY "Users can update own licenses" ON licenses
    FOR UPDATE USING (auth.uid() = user_id)
    WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can delete own licenses" ON licenses;
CREATE POLICY "Users can delete own licenses" ON licenses
    FOR DELETE USING (auth.uid() = user_id);

-- Inspections policies
DROP POLICY IF EXISTS "Users can view own inspections" ON inspections;
CREATE POLICY "Users can view own inspections" ON inspections
    FOR SELECT USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can insert own inspections" ON inspections;
CREATE POLICY "Users can insert own inspections" ON inspections
    FOR INSERT WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can update own inspections" ON inspections;
CREATE POLICY "Users can update own inspections" ON inspections
    FOR UPDATE USING (auth.uid() = user_id)
    WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can delete own inspections" ON inspections;
CREATE POLICY "Users can delete own inspections" ON inspections
    FOR DELETE USING (auth.uid() = user_id);

-- Contact messages policies
DROP POLICY IF EXISTS "Users can insert contact messages" ON contact_messages;
CREATE POLICY "Users can insert contact messages" ON contact_messages
    FOR INSERT WITH CHECK (auth.role() = 'authenticated');

DROP POLICY IF EXISTS "Users can view own contact messages" ON contact_messages;
CREATE POLICY "Users can view own contact messages" ON contact_messages
    FOR SELECT USING (auth.uid() = user_id);


-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_user_tasks_user_id ON user_tasks(user_id);
CREATE INDEX IF NOT EXISTS idx_user_tasks_task_id ON user_tasks(task_id);
CREATE INDEX IF NOT EXISTS idx_licenses_user_id ON licenses(user_id);
CREATE INDEX IF NOT EXISTS idx_licenses_expiration ON licenses(expiration_date);
CREATE INDEX IF NOT EXISTS idx_inspections_user_id ON inspections(user_id);
CREATE INDEX IF NOT EXISTS idx_tasks_state_business ON tasks(state, business_type);

-- Function to automatically create profile on signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO public.profiles (id, name, state, city, business_type, subscription_plan)
    VALUES (
        NEW.id,
        NEW.raw_user_meta_data->>'name',
        COALESCE(NEW.raw_user_meta_data->>'state', 'California'),
        COALESCE(NEW.raw_user_meta_data->>'city', ''),
        COALESCE(NEW.raw_user_meta_data->>'business_type', 'general'),
        'free'
    );
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

ALTER FUNCTION public.handle_new_user() SET search_path = public;

-- Trigger for auto-creating profile
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();
