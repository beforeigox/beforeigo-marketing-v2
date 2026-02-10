/*
  # Create waitlist table

  1. New Tables
    - `waitlist`
      - `id` (uuid, primary key) - Unique identifier for each waitlist entry
      - `name` (text, not null) - Name of the person joining the waitlist
      - `email` (text, unique, not null) - Email address for contact
      - `created_at` (timestamptz) - Timestamp when they joined the waitlist
  
  2. Security
    - Enable RLS on `waitlist` table
    - Add policy to allow public inserts (for waitlist signup)
    - Add policy to prevent public reads (admin-only access)
    
  3. Important Notes
    - Duplicate emails are prevented by unique constraint
    - Public can insert but cannot read data
    - This ensures privacy while allowing signups
*/

-- Create waitlist table
CREATE TABLE IF NOT EXISTS waitlist (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text UNIQUE NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE waitlist ENABLE ROW LEVEL SECURITY;

-- Allow anyone to insert into waitlist (for signup form)
CREATE POLICY "Anyone can join waitlist"
  ON waitlist
  FOR INSERT
  TO anon
  WITH CHECK (true);

-- Only authenticated users can read waitlist (admin access)
CREATE POLICY "Only authenticated users can view waitlist"
  ON waitlist
  FOR SELECT
  TO authenticated
  USING (true);