-- Add new columns to tasks table for detailed steps

ALTER TABLE tasks ADD COLUMN IF NOT EXISTS detailed_steps TEXT[];
ALTER TABLE tasks ADD COLUMN IF NOT EXISTS cost_details TEXT;
ALTER TABLE tasks ADD COLUMN IF NOT EXISTS timeline_details TEXT;
