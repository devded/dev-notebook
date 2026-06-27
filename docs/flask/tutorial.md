# Flask Tutorial Notes

Notes for Flask — a lightweight WSGI micro-framework.

## Setup

```bash
pip install flask
```

```python
# app.py
from flask import Flask

app = Flask(__name__)

@app.route("/")
def home():
    return "Hello, Flask!"

if __name__ == "__main__":
    app.run(debug=True)
```

```bash
flask --app app run --debug
```

## Routing

```python
@app.route("/user/<username>")
def profile(username):
    return f"User: {username}"

@app.route("/post/<int:post_id>")
def post(post_id):
    return f"Post {post_id}"

@app.route("/submit", methods=["GET", "POST"])
def submit():
    ...
```

## Request & response

```python
from flask import request, jsonify

@app.route("/api/echo", methods=["POST"])
def echo():
    data = request.get_json()
    return jsonify(data), 200

# query params: request.args.get("q")
# form data:    request.form.get("name")
```

## Templates (Jinja2)

```python
from flask import render_template

@app.route("/hello/<name>")
def hello(name):
    return render_template("hello.html", name=name)
```

```html
<!-- templates/hello.html -->
<h1>Hello {{ name }}!</h1>
{% for item in items %}
  <li>{{ item }}</li>
{% endfor %}
```

## Blueprints (modular apps)

```python
from flask import Blueprint

bp = Blueprint("auth", __name__, url_prefix="/auth")

@bp.route("/login")
def login():
    return "login"

# in app factory:
app.register_blueprint(bp)
```

## Interview talking points

- Flask is a **micro-framework** — minimal core, extend with packages (SQLAlchemy, Flask-Login, Marshmallow).
- **WSGI** application; use Gunicorn/uWSGI in production.
- **App context** vs **request context** — `current_app` and `request` proxies.
- **Blueprints** structure larger apps.
- Flask vs Django: Flask = flexibility/minimalism; Django = batteries included.
