# FastAPI: Dependencies and Security

## Dependencies (DI System)
FastAPI has a powerful dependency injection system used for logic sharing, DB connections, enforcing security, and more. Dependencies are injected via `Depends()`.

| Concept | Description | Example |
|---|---|---|
| **Function Dependency** | A python function returning or yielding a value. | `def get_db(): ...` |
| **Class Dependency** | A python class (instantiated per request). | `class CommonParams: ...` |
| **Sub-dependencies** | Dependencies can depend on other dependencies. | `def get_user(db = Depends(get_db)): ...` |
| **Yield Dependencies** | Use `yield` for setup/teardown (e.g., closing DB). | `def get_db(): yield db; db.close()` |
| **Path/Router Level** | Apply dependencies without return values to routes. | `router = APIRouter(dependencies=[Depends(verify)])` |

### Dependency Code Snippets
```python
from fastapi import FastAPI, Depends, APIRouter

app = FastAPI()

# 1. Function Dependency
def common_parameters(q: str | None = None, skip: int = 0, limit: int = 100):
    return {"q": q, "skip": skip, "limit": limit}

@app.get("/items/")
def read_items(commons: dict = Depends(common_parameters)):
    return commons

# 2. Class Dependency (Shortcut: Depends(CommonQueryParams) == Depends())
class CommonQueryParams:
    def __init__(self, q: str | None = None, skip: int = 0, limit: int = 100):
        self.q = q
        self.skip = skip
        self.limit = limit

@app.get("/users/")
def read_users(commons: CommonQueryParams = Depends()): 
    return commons

# 3. Setup and Teardown (Yield)
async def get_db():
    db = "Database Session"
    try:
        yield db
    finally:
        print("Close DB session")
```

---

## Security
Built on top of the DI system, providing out-of-the-box support for OpenAPI standard security schemes (OAuth2, HTTP Basic, API Keys).

| Security Tool | Purpose | Usage |
|---|---|---|
| `OAuth2PasswordBearer` | Extracts token from `Authorization: Bearer <token>` | `oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")` |
| `OAuth2PasswordRequestForm`| Form data dependency for standard OAuth2 login. | `form_data: OAuth2PasswordRequestForm = Depends()` |
| `Security()` | Like `Depends()`, but allows specifying OAuth2 scopes. | `Security(get_current_user, scopes=["read", "write"])` |
| `APIKeyHeader` | Extracts API key from headers. | `api_key = APIKeyHeader(name="X-API-Key")` |
| `HTTPBasic` | Extracts HTTP Basic Auth credentials. | `security = HTTPBasic()` |

### Security Code Snippets
```python
from fastapi import FastAPI, Depends, HTTPException, status, Security
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm

app = FastAPI()

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")

# 1. Token Endpoint
@app.post("/token")
async def login(form_data: OAuth2PasswordRequestForm = Depends()):
    # Validate form_data.username and form_data.password here
    return {"access_token": form_data.username, "token_type": "bearer"}

# 2. Secure Route (Requires Token)
async def get_current_user(token: str = Depends(oauth2_scheme)):
    if not token:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid authentication credentials",
            headers={"WWW-Authenticate": "Bearer"},
        )
    return {"user": "verified_user"}

@app.get("/users/me")
async def read_users_me(current_user: dict = Depends(get_current_user)):
    return current_user

# 3. OAuth2 Scopes
async def get_active_user(
    current_user: dict = Security(get_current_user, scopes=["admin"])
):
    # Validate scopes via Security()
    return current_user
```
