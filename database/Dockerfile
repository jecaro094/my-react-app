FROM postgres:latest

# Set environment variables for PostgreSQL
ENV POSTGRES_USER=postgres
ENV POSTGRES_PASSWORD=postgres
ENV POSTGRES_DB=postgres

# Copy the SQL script and custom initialization script into the Docker image
COPY init.sql /docker-entrypoint-initdb.d/
COPY init.sh /docker-entrypoint-initdb.d/

# Ensure the custom script has execute permissions
RUN chmod +x /docker-entrypoint-initdb.d/init.sh

# Expose the PostgreSQL port
EXPOSE 5432

# Define the data directory as a volume
VOLUME ["/var/lib/postgresql/data"]
