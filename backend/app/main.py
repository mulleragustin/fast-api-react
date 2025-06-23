from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.routes import auth
from app.models import user as user_models
from app.database import engine

# Crear tablas en la base de datos
user_models.Base.metadata.create_all(bind=engine)

# Inicializar FastAPI
app = FastAPI(title="FastAPI Auth Example")

# Configurar CORS
origins = [
    "http://localhost:5173",  # Frontend de React con Vite
    "http://127.0.0.1:5173",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Incluir rutas de la API
app.include_router(auth.router)

@app.get("/")
def read_root():
    return {"message": "Bienvenido a la API de autenticación con FastAPI"}

