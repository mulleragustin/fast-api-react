from pydantic import BaseModel, EmailStr
from typing import Optional

# Esquema para crear un usuario
class UserCreate(BaseModel):
    email: EmailStr
    username: str
    password: str

# Esquema para mostrar un usuario
class UserOut(BaseModel):
    id: int
    email: EmailStr
    username: str
    is_active: bool

    class Config:
        orm_mode = True

# Esquema para el login
class UserLogin(BaseModel):
    username: str
    password: str

# Esquema para el token
class Token(BaseModel):
    access_token: str
    token_type: str

# Esquema para los datos dentro del token
class TokenData(BaseModel):
    username: Optional[str] = None
