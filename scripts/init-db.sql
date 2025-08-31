-- Initial database setup for Match Me application
-- This script runs when the PostgreSQL container starts for the first time

-- Create extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pg_trgm";

-- Create database if it doesn't exist
SELECT 'CREATE DATABASE matchme_db'
WHERE NOT EXISTS (SELECT FROM pg_database WHERE datname = 'matchme_db')\gexec

-- Connect to the database
\c matchme_db;

-- Create indexes for better performance
-- (These will be created after Prisma migrations run)

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Initial admin user setup (will be created by seed script)
-- This is just a placeholder for database initialization