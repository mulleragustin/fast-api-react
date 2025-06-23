# FastAPI + React + Vite + TailwindCSS

Proyecto base para autenticación y vistas protegidas usando FastAPI (Python) en el backend y React + Vite + TypeScript + TailwindCSS en el frontend.

## Estructura del proyecto

```
fast-api-react/
├── backend/   # FastAPI, SQLAlchemy, autenticación JWT
└── frontend/  # React, Vite, TypeScript, TailwindCSS
```

---

## Backend (FastAPI)

- Autenticación JWT (registro, login, usuario actual)
- ORM: SQLAlchemy
- Base de datos: SQLite (fácil de cambiar a MySQL/PostgreSQL)
- CORS habilitado para desarrollo

### Comandos útiles

```bash
cd backend
python main.py
```

- El backend corre en: `http://localhost:8000`

### Endpoints principales
- `POST /auth/register` — Registro de usuario
- `POST /auth/login` — Login (devuelve JWT)
- `GET /auth/me` — Usuario autenticado actual

---

## Frontend (React + Vite + TailwindCSS)

- Login responsive
- Vistas protegidas (solo usuarios autenticados acceden al Home)
- Almacenamiento de token JWT en localStorage

### Comandos útiles

```bash
cd frontend
npm install
npm run dev
```

- El frontend corre en: `http://localhost:5173`

---

## Personalización

- Para cambiar la base de datos, edita `backend/app/database.py`.
- Para agregar campos al usuario, edita `backend/app/models/user.py` y usa Alembic para migraciones.
- Para agregar nuevas vistas, crea componentes en `frontend/src/pages`.

---

## Requisitos
- Python 3.10+
- Node.js 18+

---

## Créditos
- FastAPI: https://fastapi.tiangolo.com/
- Vite: https://vitejs.dev/
- TailwindCSS: https://tailwindcss.com/
- React: https://react.dev/
