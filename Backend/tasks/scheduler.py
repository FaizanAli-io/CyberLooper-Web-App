# tasks/scheduler.py

from apscheduler.schedulers.background import BackgroundScheduler
from datetime import date
from sqlalchemy.orm import Session
from database import SessionLocal
from users.models import User
from pytz import timezone

import os
from dotenv import load_dotenv

load_dotenv()
TOKEN_RESET_HOUR = int(os.getenv("TOKEN_RESET_HOUR"))
TOKEN_RESET_MINUTE = int(os.getenv("TOKEN_RESET_MINUTE"))


def reset_all_users_token_usage():
    db: Session = SessionLocal()
    try:
        db.query(User).update({User.token_used: 0})
        db.commit()
        print("✅ Token usage reset for all users.")
    except Exception as e:
        print(f"❌ Error resetting token usage: {e}")
    finally:
        db.close()


def start_scheduler():
    scheduler = BackgroundScheduler()
    scheduler.add_job(
        reset_all_users_token_usage,
        "cron",
        hour=TOKEN_RESET_HOUR,
        minute=TOKEN_RESET_MINUTE,
        timezone=timezone("Asia/Karachi"),
    )  # Every day at midnight
    scheduler.start()
    print(TOKEN_RESET_HOUR, TOKEN_RESET_MINUTE)
    print("🕓 Scheduler started for daily token reset.")
