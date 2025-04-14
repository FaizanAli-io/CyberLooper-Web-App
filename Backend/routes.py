from fastapi import APIRouter
from users.routes import router as user_router
from blogs.routes import router as blog_router
from chats.routes import router as chat_router
from messages.routes import router as messages_router
from contactform.routes import router as contactform_router

router = APIRouter()

# Include all routers
router.include_router(user_router, prefix="/users", tags=["Users"])
router.include_router(blog_router, prefix="/blogs", tags=["Blogs"])
router.include_router(chat_router, prefix="/chats", tags=["Chats"])
router.include_router(messages_router, prefix="/messages", tags=["Messages"])
router.include_router(contactform_router, prefix="/contactform", tags=["ContactForms"])
