/*
  # Create newsletter table

  1. New Tables
    - `newsletter`
      - `id` (uuid, primary key) - Unique identifier for each newsletter subscriber
      - `name` (text, not null) - Name of the subscriber
      - `email` (text, unique, not null) - Email address for newsletter
      - `source` (text, default 'popup') - Where the subscriber signed up from (popup, footer, etc.)
      - `created_at` (timestamptz) - Timestamp when they subscribed

  2. Security
    - Enable RLS on `newsletter` table
    - Add policy to allow public inserts (for newsletter signup)
    - Add policy to prevent public reads (admin-only access)

  3. Important Notes
    - Duplicate emails are prevented by unique constraint
    - Public can insert but cannot read data
    - Source field helps track where signups came from
*/

-- Create newsletter table
CREATE TABLE IF NOT EXISTS newsletter (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text UNIQUE NOT NULL,
  source text DEFAULT 'popup',
  created_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE newsletter ENABLE ROW LEVEL SECURITY;

-- Allow anyone to insert into newsletter (for signup form)
CREATE POLICY "Anyone can subscribe to newsletter"
  ON newsletter
  FOR INSERT
  TO anon
  WITH CHECK (true);

-- Only authenticated users can read newsletter (admin access)
CREATE POLICY "Only authenticated users can view newsletter"
  ON newsletter
  FOR SELECT
  TO authenticated
  USING (true);