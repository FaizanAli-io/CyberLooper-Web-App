import jwt
from datetime import datetime, timedelta
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from database import get_db
from users.crud import (
    authenticate_user,
    create_user,
    get_user,
    update_user,
    delete_user,
    get_or_create_firebase_user,
)
from users.schemas import UserCreate, UserUpdate, UserResponse
from users.models import User
from users.auth import get_current_user, verify_firebase_token

router = APIRouter()

SECRET_KEY = "your_secret_key"  # Change this to a secure key
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 30


def create_access_token(user_id: int):
    expire = datetime.utcnow() + timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    payload = {"user_id": user_id, "exp": expire}
    return jwt.encode(payload, SECRET_KEY, algorithm=ALGORITHM)


@router.post("/login", status_code=status.HTTP_200_OK)
def login_user(data: dict, db: Session = Depends(get_db)):
    email = data.get("email")
    password = data.get("password")
    firebase_token = data.get("firebase_token")

    if firebase_token:
        firebase_user = verify_firebase_token(firebase_token)
        print("FIREBASE USER: ", firebase_user)
        if not firebase_user:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Invalid Firebase token",
            )
        user = get_or_create_firebase_user(
            db, firebase_user["uid"], firebase_user["email"]
        )
    else:
        if not email or not password:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Email and password are required",
            )
        user = authenticate_user(db, email, password)
        if not user:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Invalid email or password",
            )

    access_token = create_access_token(user.id)
    return {"message": "Login successful", "accessToken": access_token}


@router.get("/verify", status_code=status.HTTP_200_OK)
def verify(
    db: Session = Depends(get_db), current_user: User = Depends(get_current_user)
):
    return {"message": "access granted"}


# , response_model=UserResponse
@router.post("")
def create_new_user(user: UserCreate, db: Session = Depends(get_db)):
    existing_user = db.query(User).filter(User.email == user.email).first()
    if existing_user:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Email already registered",
        )

    created_user = create_user(db, user)

    access_token = create_access_token(created_user.id)

    return {"message": "Signup successful", "accessToken": access_token}


@router.get("", response_model=UserResponse)
def read_user(
    db: Session = Depends(get_db), current_user: User = Depends(get_current_user)
):
    db_user = get_user(db, current_user.id)
    if db_user is None:
        raise HTTPException(status_code=404, detail="User not found")
    return db_user


@router.put("", response_model=UserResponse)
def update_existing_user(
    user_id: int,
    user: UserUpdate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    updated_user = update_user(db, current_user.id, user)
    if updated_user is None:
        raise HTTPException(status_code=404, detail="User not found")
    return updated_user


@router.delete("")
def delete_existing_user(
    user_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    deleted_user = delete_user(db, current_user.id)
    if deleted_user is None:
        raise HTTPException(status_code=404, detail="User not found")
    return {"detail": "User deleted successfully"}
