#!/bin/bash
set -e

# Run the SQL script
psql -v ON_ERROR_STOP=1 --username "$POSTGRES_USER" --dbname "$POSTGRES_DB" -f /docker-entrypoint-initdb.d/init.sql

# Remove the SQL script after execution
rm -f /docker-entrypoint-initdb.d/init.sql

# Optionally, remove the script itself
rm -f /docker-entrypoint-initdb.d/init.sh
