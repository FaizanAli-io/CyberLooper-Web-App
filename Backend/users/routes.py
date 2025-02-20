from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from database import get_db
from users.crud import create_user, get_user, get_users, update_user, delete_user
from users.schemas import UserCreate, UserUpdate, UserResponse

router = APIRouter()

@router.post("", response_model=UserResponse)
def create_new_user(user: UserCreate, db: Session = Depends(get_db)):
    existing_user = db.query(get_user).filter(get_user.email == user.email).first()
    if existing_user:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Email already registered",
        )
    return create_user(db, user)

@router.get("/{user_id}", response_model=UserResponse)
def read_user(user_id: int, db: Session = Depends(get_db)):
    db_user = get_user(db, user_id)
    if db_user is None:
        raise HTTPException(status_code=404, detail="User not found")
    return db_user

@router.get("", response_model=list[UserResponse])
def read_users(skip: int = 0, limit: int = 10, db: Session = Depends(get_db)):
    return get_users(db, skip, limit)

@router.put("/{user_id}", response_model=UserResponse)
def update_existing_user(user_id: int, user: UserUpdate, db: Session = Depends(get_db)):
    updated_user = update_user(db, user_id, user)
    if updated_user is None:
        raise HTTPException(status_code=404, detail="User not found")
    return updated_user

@router.delete("/{user_id}")
def delete_existing_user(user_id: int, db: Session = Depends(get_db)):
    deleted_user = delete_user(db, user_id)
    if deleted_user is None:
        raise HTTPException(status_code=404, detail="User not found")
    return {"detail": "User deleted successfully"}


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
