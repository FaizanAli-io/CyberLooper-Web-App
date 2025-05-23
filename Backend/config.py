import os
from dotenv import load_dotenv
from pydantic_settings import BaseSettings, SettingsConfigDict

load_dotenv()


class Settings(BaseSettings):
    XAI_API_KEY: str = os.getenv("XAI_API_KEY")
    DATABASE_URL: str = os.getenv("DATABASE_URL")
    OPENAI_API_KEY: str = os.getenv("OPENAI_API_KEY")
    model_config = SettingsConfigDict(env_file=".env", extra="allow")


settings = Settings()
