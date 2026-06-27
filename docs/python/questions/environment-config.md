# Environment & Configuration

> Add new questions below in the same format: `## Question? <Badge ... />` then the answer.

## What is a virtual environment and when should you use one? <Badge type="tip" text="easy" />

An isolated Python environment with its own packages, separate from the system install and other projects. Use one per project to avoid dependency conflicts and keep builds reproducible.

## How do you manage environments with `venv`? <Badge type="tip" text="easy" />

```bash
python -m venv .venv          # create
source .venv/bin/activate     # activate (Linux/macOS)
.venv\Scripts\activate        # activate (Windows)
deactivate                    # exit
```

## How do you install Python packages? <Badge type="tip" text="easy" />

With `pip` (or faster tools like `uv`). Install, pin versions, and list what's installed.

```bash
pip install requests
pip install "django==5.0"
pip list
```

## How do you manage dependencies in a project? <Badge type="warning" text="medium" />

Pin them in a file so installs are reproducible: `requirements.txt` (classic) or `pyproject.toml` (modern, with Poetry/uv/PDM). Commit the lock/requirements file.

```bash
pip freeze > requirements.txt
pip install -r requirements.txt
```

## What is Docker and how do you use it with Python? <Badge type="warning" text="medium" />

Docker packages your app and its dependencies into a portable container that runs identically anywhere. For Python, write a `Dockerfile` based on a `python` image.

```dockerfile
FROM python:3.13-slim
WORKDIR /app
COPY requirements.txt .
RUN pip install -r requirements.txt
COPY . .
CMD ["python", "app.py"]
```

## What are the key Python environment variables? <Badge type="warning" text="medium" />

- **`PYTHONPATH`** — extra directories to search for modules (like the OS `PATH`).
- **`PYTHONSTARTUP`** — path to a script run automatically when the interactive interpreter starts.
- **`PYTHONHOME`** — alternative location of the standard libraries.
- **`PYTHONDONTWRITEBYTECODE`** — if set, don't write `.pyc` files.
- **`PYTHONCASEOK`** — (Windows) allow case-insensitive module imports.

## How do you check the installed Python version? <Badge type="tip" text="easy" />

From the shell with a flag, or at runtime via `sys`.

```bash
python --version      # or: python -V
python3 --version
```

```python
import sys
sys.version           # full version string
sys.version_info      # (3, 13, 0, ...) — easy to compare
```

## Difference between `venv`, `virtualenv`, and Conda? <Badge type="warning" text="medium" />

- **`venv`** — built into the stdlib (3.3+); lightweight per-project Python environments. The default choice.
- **`virtualenv`** — the older third-party tool `venv` was based on; a bit faster, more features, supports older Pythons.
- **Conda** — a language-agnostic package *and* environment manager (Anaconda/Miniconda); installs non-Python binaries (C libs, CUDA) too — popular in data science.
