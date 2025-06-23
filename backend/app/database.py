import os
from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
from dotenv import load_dotenv

# Cargar variables de entorno desde .env
load_dotenv()

# Leer el modo de entorno y la URL de la base de datos desde variables de entorno
PRODUCTION = os.getenv("PRODUCTION", "False").lower() == "true"
DB_URL = os.getenv("DB_URL", "mysql+mysqlconnector://usuario:contraseña@localhost/nombre_db")
SQLITE_URL = os.getenv("SQLITE_URL", "sqlite:///./sql_app.db")

if PRODUCTION:
    SQLALCHEMY_DATABASE_URL = DB_URL
    engine = create_engine(SQLALCHEMY_DATABASE_URL)
else:
    SQLALCHEMY_DATABASE_URL = SQLITE_URL
    engine = create_engine(
        SQLALCHEMY_DATABASE_URL, connect_args={"check_same_thread": False}
    )

SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()

# Función para obtener la sesión de BD
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
