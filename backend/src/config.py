from pydantic import BaseModel


class LocalConfig(BaseModel):
    DB_HOST: str = "host.docker.internal"  # When running inside container
    # DB_HOST: str = "localhost" # When running as script
    DB_PORT: str = "5432"
    DB_NAME: str = "postgres"
    DB_USER: str = "postgres"
    DB_PASSWORD: str = "postgres"
    DB_SCHEMA: str = "public"


# Create an instance of the configuration model
config = LocalConfig()
