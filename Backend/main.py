import routes
from fastapi import FastAPI
from database import Base, engine

app = FastAPI()

Base.metadata.create_all(bind=engine)

app.include_router(routes.router)
