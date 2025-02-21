import routes
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from database import Base, engine

app = FastAPI()

origins = [
   "*"
]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,  # Allow specific frontend origins
    allow_credentials=True,
    allow_methods=["*"],  # Allow all HTTP methods (POST, GET, PUT, DELETE, etc.)
    allow_headers=["*"],  # Allow all headers
)


Base.metadata.create_all(bind=engine)

app.include_router(routes.router)
