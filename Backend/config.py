from pydantic_settings import BaseSettings


class Settings(BaseSettings):
    DATABASE_URL: str = (
        "postgresql://neondb_owner:npg_47WoSGbrDfed@ep-solitary-hat-a8eltskn-pooler.eastus2.azure.neon.tech/neondb?sslmode=require"
    )

    class Config:
        env_file = ".env"


settings = Settings()
