# FastAPI: Routing and Pydantic

## Routing Basics

| Operation | Decorator Example | Description |
| :--- | :--- | :--- |
| **GET** | `@app.get("/items/")` | Read data |
| **POST** | `@app.post("/items/")` | Create data |
| **PUT** | `@app.put("/items/{id}")` | Update data (replace) |
| **PATCH** | `@app.patch("/items/{id}")` | Update data (partial) |
| **DELETE** | `@app.delete("/items/{id}")` | Delete data |

### Parameters

#### Path Parameters
```python
from fastapi import FastAPI

app = FastAPI()

@app.get("/items/{item_id}")
async def read_item(item_id: int):
    return {"item_id": item_id}
```
*   **Path constraints (`Path`)**:
    ```python
    from fastapi import Path
    @app.get("/items/{item_id}")
    async def read_item(item_id: int = Path(..., title="The ID", ge=1)):
        pass
    ```

#### Query Parameters
Function arguments not in the path are automatically query parameters.
```python
@app.get("/items/")
async def read_item(skip: int = 0, limit: int = 10):
    return {"skip": skip, "limit": limit}
```
*   **Query constraints (`Query`)**:
    ```python
    from fastapi import Query
    @app.get("/items/")
    async def read_items(q: str | None = Query(None, min_length=3, max_length=50, pattern="^fixedquery$")):
        pass
    ```

#### Request Body
Use Pydantic models to define request bodies.
```python
from pydantic import BaseModel

class Item(BaseModel):
    name: str
    description: str | None = None
    price: float
    tax: float | None = None

@app.post("/items/")
async def create_item(item: Item):
    return item
```
*   **Multiple Body Parameters**: Add multiple Pydantic models to the function signature (merges payloads).
*   **Singular Body Values (`Body`)**:
    ```python
    from fastapi import Body
    @app.post("/items/update")
    async def update_item(item_id: int = Body(...)):
        pass
    ```

#### Headers & Cookies
```python
from fastapi import Cookie, Header

@app.get("/items/")
async def read_items(cookie_id: str | None = Cookie(None), user_agent: str | None = Header(None)):
    return {"cookie_id": cookie_id, "User-Agent": user_agent}
```

#### Form Data & Files
```python
from fastapi import Form, File, UploadFile

@app.post("/login/")
async def login(username: str = Form(...), password: str = Form(...)):
    pass

@app.post("/files/")
async def create_file(file: bytes = File(...)): # Reads entire file into memory
    pass

@app.post("/uploadfile/")
async def create_upload_file(file: UploadFile): # Uses SpooledTemporaryFile
    # await file.read()
    pass
```

## Pydantic Validation (v2)

### `Field` Customization
Used to configure validation and metadata for model attributes.
```python
from pydantic import BaseModel, Field

class Item(BaseModel):
    name: str = Field(..., examples=["Foo"])
    description: str | None = Field(None, title="The description", max_length=300)
    price: float = Field(..., gt=0, description="Price must be > 0")
```

| Field Argument | Description |
| :--- | :--- |
| `...` | Indicates a required field (no default value) |
| `default` | Default value if omitted |
| `alias` | Alternative name for input/output |
| `title` / `description` | OpenAPI Schema metadata |
| `gt`, `ge` | Greater than, greater than or equal to |
| `lt`, `le` | Less than, less than or equal to |
| `min_length`, `max_length` | String length constraints |
| `pattern` | Regular expression pattern for strings |

### Advanced Validators

#### `@field_validator`
Validates individual fields before or after standard validation.
```python
from pydantic import BaseModel, field_validator

class UserModel(BaseModel):
    username: str

    @field_validator('username')
    @classmethod
    def username_alphanumeric(cls, v: str):
        if not v.isalnum():
            raise ValueError('must be alphanumeric')
        return v
```

#### `@model_validator`
Validates multiple fields together or the entire model.
```python
from pydantic import BaseModel, model_validator

class PasswordsModel(BaseModel):
    password: str
    password_confirm: str

    @model_validator(mode='after')
    def check_passwords_match(self):
        if self.password != self.password_confirm:
            raise ValueError('passwords do not match')
        return self
```

### Config (`model_config`)
```python
from pydantic import BaseModel, ConfigDict

class User(BaseModel):
    model_config = ConfigDict(str_strip_whitespace=True, extra='forbid')
    username: str
```
