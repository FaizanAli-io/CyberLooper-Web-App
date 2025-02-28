from datetime import datetime, timedelta
import jwt
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from database import get_db
from users.crud import authenticate_user,create_user, get_user, get_users, update_user, delete_user
from users.schemas import UserCreate, UserUpdate, UserResponse
from users.models import User
from users.auth import get_current_user

router = APIRouter()

# JWT Configuration
SECRET_KEY = "your_secret_key"  # Change this to a secure key
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 30

def create_access_token(user_id: int):
    """Generate JWT access token containing only user ID."""
    expire = datetime.utcnow() + timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    payload = {"user_id": user_id, "exp": expire}
    return jwt.encode(payload, SECRET_KEY, algorithm=ALGORITHM)

@router.post("/login", status_code=status.HTTP_200_OK)
def login_user(data: dict, db: Session = Depends(get_db)):
    """Login user by checking if they exist in the database and return JWT token."""
    email = data.get("email")
    password = data.get("password")

    if not email or not password:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Email and password are required")

    user = authenticate_user(db, email, password)

    if not user:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid email or password")

    # Generate JWT Token with only user ID
    access_token = create_access_token(user.id)

    return {
        "message": "Login successful",
        "accessToken": access_token
    }

@router.get("/verify", status_code=status.HTTP_200_OK)
def verify(db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    return {
        "message": "access granted"
    }

@router.post("", response_model=UserResponse)
def create_new_user(user: UserCreate, db: Session = Depends(get_db)):
    existing_user = db.query(User).filter(User.email == user.email).first()
    if existing_user:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Email already registered",
        )
    
    created_user = create_user(db, user)

    access_token = create_access_token(created_user.id)

    return {
        "message": "Signup successful",
        "accessToken": access_token
    }

@router.get("", response_model=UserResponse)
def read_user(db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    db_user = get_user(db, current_user.id)
    if db_user is None:
        raise HTTPException(status_code=404, detail="User not found")
    return db_user

# @router.get("", response_model=list[UserResponse])
# def read_users(skip: int = 0, limit: int = 10, db: Session = Depends(get_db)):
#     return get_users(db, skip, limit)

@router.put("", response_model=UserResponse)
def update_existing_user(user_id: int, user: UserUpdate, db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    updated_user = update_user(db, current_user.id, user)
    if updated_user is None:
        raise HTTPException(status_code=404, detail="User not found")
    return updated_user

@router.delete("")
def delete_existing_user(user_id: int, db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    deleted_user = delete_user(db, current_user.id)
    if deleted_user is None:
        raise HTTPException(status_code=404, detail="User not found")
    return {"detail": "User deleted successfully"}

#############################################################################################################################

from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from google.oauth2 import id_token
from google.auth.transport import requests
import jwt
from datetime import datetime, timedelta
from database import get_db
from users.models import User, UserRole
from users.crud import create_user
from users.auth import create_access_token
from users.schemas import UserResponse

router = APIRouter()

# JWT Configuration
SECRET_KEY = "your_secret_key"  # Change this to a secure key
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 30
GOOGLE_CLIENT_ID = "your_google_client_id"  # Get this from Firebase


def verify_google_token(token: str):
    """Verify Google ID token."""
    try:
        return id_token.verify_oauth2_token(token, requests.Request(), GOOGLE_CLIENT_ID)
    except:
        return None


@router.post("/google-login", status_code=status.HTTP_200_OK)
def google_login(data: dict, db: Session = Depends(get_db)):
    """Authenticate user via Google and return JWT."""
    google_token = data.get("token")
    if not google_token:
        raise HTTPException(status_code=400, detail="Token is required")

    google_data = verify_google_token(google_token)
    if not google_data:
        raise HTTPException(status_code=401, detail="Invalid Google token")

    email = google_data.get("email")
    user = db.query(User).filter(User.email == email).first()

    if not user:
        user_data = {
            "email": email,
            "password": "",  # No password for Google users
            "role": UserRole.STANDARD,
        }
        user = create_user(db, user_data)

    access_token = create_access_token(user.id)
    return {"message": "Login successful", "accessToken": access_token}

# import users.crud.py as crud
# from database import get_db
# from sqlalchemy.orm import Session
# from schemas import UserCreate, UserUpdate, UserResponse
# from fastapi import Depends, APIRouter, HTTPException, status

# router = APIRouter(prefix="/users", tags=["Users"])


# @router.post("/", response_model=UserResponse)
# def create_user(user: UserCreate, db: Session = Depends(get_db)):
#     existing_user = db.query(crud.User).filter(crud.User.email == user.email).first()
#     if existing_user:
#         raise HTTPException(
#             status_code=status.HTTP_400_BAD_REQUEST,
#             detail="Email already registered",
#         )
#     return crud.create_user(db, user)


# @router.get("/{user_id}", response_model=UserResponse)
# def get_user(user_id: int, db: Session = Depends(get_db)):
#     user = crud.get_user(db, user_id)
#     if not user:
#         raise HTTPException(
#             status_code=status.HTTP_404_NOT_FOUND,
#             detail="User not found",
#         )
#     return user


# @router.get("/", response_model=list[UserResponse])
# def get_users(skip: int = 0, limit: int = 10, db: Session = Depends(get_db)):
#     return crud.get_users(db, skip, limit)


# from schemas import UserUpdate


# @router.patch("/{user_id}", response_model=UserResponse)
# def update_user(user_id: int, user: UserUpdate, db: Session = Depends(get_db)):
#     existing_user = crud.update_user(db, user_id, user)
#     if not existing_user:
#         raise HTTPException(
#             status_code=status.HTTP_404_NOT_FOUND,
#             detail="User not found",
#         )
#     return existing_user


# @router.delete("/{user_id}")
# def delete_user(user_id: int, db: Session = Depends(get_db)):
#     deleted_user = crud.delete_user(db, user_id)
#     if not deleted_user:
#         raise HTTPException(
#             status_code=status.HTTP_404_NOT_FOUND,
#             detail="User not found",
#         )
#     return {"message": "User deleted successfully"}
