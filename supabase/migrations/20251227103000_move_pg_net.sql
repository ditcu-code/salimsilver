-- Create a new schema 'extensions' if it doesn't exist
create schema if not exists extensions;

-- Grant usage on the schema to standard roles
grant usage on schema extensions to postgres, anon, authenticated, service_role;

-- Drop pg_net extension from public (or current) schema
drop extension if exists pg_net;

-- Create pg_net extension in the extensions schema
create extension pg_net schema extensions;
