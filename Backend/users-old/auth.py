from fastapi import Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer
import jwt
from jwt import ExpiredSignatureError, InvalidTokenError
from database import get_db
from sqlalchemy.orm import Session
from users.models import User

# JWT Configuration
SECRET_KEY = "your_secret_key"  # Change this to a secure key
ALGORITHM = "HS256"

# OAuth2 scheme to extract the token from the "Authorization" header
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="login")

def verify_access_token(token: str):
    """Decode JWT token and verify its validity."""
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        user_id: int = payload.get("user_id")

        if user_id is None:
            raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid token")

        return user_id  # Return user ID for use in protected routes

    except ExpiredSignatureError:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Token expired")

    except InvalidTokenError:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid token")

def get_current_user(token: str = Depends(oauth2_scheme), db: Session = Depends(get_db)):
    """Middleware to verify JWT token and retrieve the user."""
    user_id = verify_access_token(token)
    user = db.query(User).filter(User.id == user_id).first()

    if user is None:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="User not found")

    return user  # Return the authenticated user