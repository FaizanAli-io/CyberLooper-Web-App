import os
from dotenv import load_dotenv
from pydantic_settings import BaseSettings, SettingsConfigDict

# Load environment variables from .env file
load_dotenv()


class Settings(BaseSettings):
    DATABASE_URL: str = os.getenv(
        "DATABASE_URL",
        "postgresql://neondb_owner:npg_47WoSGbrDfed@ep-solitary-hat-a8eltskn-pooler.eastus2.azure.neon.tech/neondb?sslmode=require",
    )
    OPENAI_API_KEY: str = os.getenv("OPENAI_API_KEY")

    model_config = SettingsConfigDict(
        env_file=".env", extra="allow"
    )  # Allow extra fields


settings = Settings()


# from pydantic_settings import BaseSettings


# class Settings(BaseSettings):
#     DATABASE_URL: str = (
#         "postgresql://neondb_owner:npg_47WoSGbrDfed@ep-solitary-hat-a8eltskn-pooler.eastus2.azure.neon.tech/neondb?sslmode=require"
#     )

#     class Config:
#         env_file = ".env"


# settings = Settings()

# import os
# from dotenv import load_dotenv

# # Load environment variables from .env file
# load_dotenv()

# # Fetch the API key from .env
# OPENAI_API_KEY = os.getenv("OPENAI_API_KEY")

# from pydantic_settings import BaseSettings, SettingsConfigDict
