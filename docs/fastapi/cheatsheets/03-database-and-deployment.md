# FastAPI: Database and Deployment

## 1. Database Integration (SQLAlchemy)

### Core Components
| Component | Description | Example / Best Practice |
| :--- | :--- | :--- |
| **Engine** | Entry point to the database | `create_engine(DB_URL, connect_args={"check_same_thread": False})` (SQLite) |
| **SessionLocal** | Database session factory | `sessionmaker(autocommit=False, autoflush=False, bind=engine)` |
| **Base** | Base class for ORM models | `Base = declarative_base()` |
| **Dependency** | FastAPI DB injection | `def get_db(): ... yield db ...` |

### Database Setup (`database.py`)
```python
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, declarative_base

SQLALCHEMY_DATABASE_URL = "postgresql://user:password@localhost/dbname"

engine = create_engine(SQLALCHEMY_DATABASE_URL)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()

# Dependency
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
```

### Models & Schemas
| Type | Purpose | Tool |
| :--- | :--- | :--- |
| **ORM Models** | DB structure, relationships | SQLAlchemy (`Base`) |
| **Pydantic Models (Schemas)** | Data validation, serialization | Pydantic (`BaseModel`) |

```python
# models.py (SQLAlchemy)
from sqlalchemy import Column, Integer, String
from .database import Base

class User(Base):
    __tablename__ = "users"
    id = Column(Integer, primary_key=True, index=True)
    email = Column(String, unique=True, index=True)

# schemas.py (Pydantic)
from pydantic import BaseModel

class UserCreate(BaseModel):
    email: str

class UserResponse(BaseModel):
    id: int
    email: str
    class Config:
        orm_mode = True # For Pydantic v1. Use from_attributes=True for v2
```

### Route Integration
```python
from fastapi import FastAPI, Depends
from sqlalchemy.orm import Session
from . import models, schemas, database

app = FastAPI()

@app.post("/users/", response_model=schemas.UserResponse)
def create_user(user: schemas.UserCreate, db: Session = Depends(database.get_db)):
    db_user = models.User(email=user.email)
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user
```

---

## 2. Database Migrations (Alembic)

| Command | Action |
| :--- | :--- |
| `alembic init alembic` | Initialize Alembic in project |
| `alembic revision --autogenerate -m "msg"` | Generate migration script from models |
| `alembic upgrade head` | Apply migrations to DB |
| `alembic downgrade -1` | Revert last migration |

*Setup `alembic/env.py`:*
```python
import sys
from logging.config import fileConfig
from sqlalchemy import engine_from_config, pool
from alembic import context
from myapp.database import Base # Import Base
from myapp import models # Import all models

target_metadata = Base.metadata # Set target_metadata
```

---

## 3. Deployment

### Server Options
| Server | Role | Command |
| :--- | :--- | :--- |
| **Uvicorn** | ASGI Web Server (Worker) | `uvicorn main:app --host 0.0.0.0 --port 8000` |
| **Gunicorn** | Process Manager | `gunicorn main:app -w 4 -k uvicorn.workers.UvicornWorker` |

### Docker Deployment (`Dockerfile`)
```dockerfile
FROM python:3.11-slim

WORKDIR /app
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY . .

# Run Uvicorn directly (simple) or Gunicorn (production)
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]
# CMD ["gunicorn", "main:app", "--workers", "4", "--worker-class", "uvicorn.workers.UvicornWorker", "--bind", "0.0.0.0:8000"]
```

### Environment Variables (.env)
```python
# Use Pydantic BaseSettings for config
from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    database_url: str
    secret_key: str

    class Config:
        env_file = ".env"

settings = Settings()
```

### Production Checklist
- [ ] Turn off `debug` mode.
- [ ] Use a process manager (Gunicorn, systemd, or Docker orchestrator).
- [ ] Set `WORKERS` appropriately (e.g., `2 * CPU_CORES + 1`).
- [ ] Reverse Proxy (Nginx/Traefik) for HTTPS & load balancing.
- [ ] Manage secrets via `.env` or secret manager.
- [ ] Apply database migrations automatically in CI/CD, not app startup.
