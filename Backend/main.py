import routes
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from database import Base, engine

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_headers=["*"],
    allow_origins=["*"],
    allow_methods=["*"],
    allow_credentials=True,
)

Base.metadata.create_all(bind=engine)

app.include_router(routes.router)
