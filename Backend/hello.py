from sqlalchemy import text
from database import engine

with engine.connect() as conn:
    conn.execute(text("DROP TABLE IF EXISTS blogs CASCADE;"))
    conn.commit()

print("Table dropped successfully.")
