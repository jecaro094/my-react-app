import os
from pydantic import BaseModel, Field


class LocalConfig(BaseModel):
    DB_HOST: str = Field(default_factory=lambda: os.getenv("UPSTREAM_HOST", "host.docker.internal")) # When running inside a container
    DB_CORS_URL: str = Field(default_factory=lambda: os.getenv("DB_CORS_URL", "http://localhost:3000")) 
    # DB_HOST: str = Field(default_factory=lambda: os.getenv("DB_HOST", "localhost")) # When running as a script
    DB_PORT: str = Field(default_factory=lambda: os.getenv("DB_PORT", "5432"))
    DB_NAME: str = Field(default_factory=lambda: os.getenv("POSTGRES_DB", "postgres"))
    DB_USER: str = Field(default_factory=lambda: os.getenv("POSTGRES_USER", "postgres"))
    DB_PASSWORD: str = Field(default_factory=lambda: os.getenv("POSTGRES_PASSWORD", "postgres"))
    DB_SCHEMA: str = Field(default_factory=lambda: os.getenv("DB_SCHEMA", "public"))


# Create an instance of the configuration model
config = LocalConfig()
