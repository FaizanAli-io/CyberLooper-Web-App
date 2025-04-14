from sqlalchemy import text
from database import engine

with engine.connect() as conn:
    conn.execute(text("DROP TABLE IF EXISTS users CASCADE;"))
    conn.commit()
    conn.execute(text("DROP TABLE IF EXISTS blogs CASCADE;"))
    conn.commit()
    conn.execute(text("DROP TABLE IF EXISTS chats CASCADE;"))
    conn.commit()
    conn.execute(text("DROP TABLE IF EXISTS messages CASCADE;"))
    conn.commit()
    conn.execute(text("DROP TABLE IF EXISTS contactforms CASCADE;"))
    conn.commit()

print("Table dropped successfully.")
