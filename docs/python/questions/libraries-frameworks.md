# Libraries & Frameworks

> Add new questions below in the same format: `## Question? <Badge ... />` then the answer.
> For full tutorials, see [Django](/django/) and [Flask](/flask/tutorial).

## What are the key features of Flask? <Badge type="warning" text="medium" />

::: details View Answer
A lightweight WSGI micro-framework: minimal core, routing via decorators, Jinja2 templating, a built-in dev server/debugger, and extensibility through packages (SQLAlchemy, Flask-Login). You add only what you need.
:::

## How do you build a REST API in Flask? <Badge type="warning" text="medium" />

::: details View Answer
Define routes with HTTP methods and return JSON via `jsonify`.

```python
from flask import Flask, jsonify, request
app = Flask(__name__)

@app.route("/api/items", methods=["GET", "POST"])
def items():
    if request.method == "POST":
        return jsonify(request.get_json()), 201
    return jsonify([{"id": 1}])
```
:::

## What is Django and what is it used for? <Badge type="tip" text="easy" />

::: details View Answer
A batteries-included, high-level web framework following the MVT pattern. It bundles an ORM, admin site, auth, forms, and routing for building full-featured web apps fast.
:::

## How do you create a new Django project? <Badge type="tip" text="easy" />

::: details View Answer
```bash
django-admin startproject mysite
cd mysite
python manage.py startapp blog
python manage.py runserver
```
:::

## What is an ORM, and how does Django use it? <Badge type="warning" text="medium" />

::: details View Answer
An ORM (Object-Relational Mapper) maps database tables to Python classes so you query with objects instead of SQL. Django models subclass `models.Model`; querysets generate the SQL.

```python
class Post(models.Model):
    title = models.CharField(max_length=200)

Post.objects.filter(title__icontains="django")
```
:::

## What is the `requests` module for? <Badge type="tip" text="easy" />

::: details View Answer
A friendly HTTP client for calling APIs/web services — GET/POST etc. with easy params, headers, JSON, and response handling.

```python
import requests
r = requests.get("https://api.example.com/data", params={"q": "x"})
r.raise_for_status()
data = r.json()
```
:::

## How do you visualize data in Python? <Badge type="tip" text="easy" />

::: details View Answer
Use `matplotlib` (foundational plotting), `seaborn` (statistical charts on top of it), or `plotly` (interactive). pandas also has `.plot()` built in.

```python
import matplotlib.pyplot as plt
plt.plot([1, 2, 3], [1, 4, 9])
plt.show()
```
:::

## What libraries are used for machine learning? <Badge type="tip" text="easy" />

::: details View Answer
`scikit-learn` (classic ML), `TensorFlow` and `PyTorch` (deep learning), `XGBoost`/`LightGBM` (gradient boosting), with `pandas`/`NumPy` for data prep.
:::

## How do you schedule tasks in Python? <Badge type="warning" text="medium" />

::: details View Answer
Options: OS schedulers (cron, Task Scheduler), the `schedule` library for simple in-process jobs, `APScheduler` for advanced scheduling, or Celery for distributed task queues.

```python
import schedule, time
schedule.every(10).minutes.do(lambda: print("tick"))
while True:
    schedule.run_pending()
    time.sleep(1)
```
:::

## How is Flask different from Django? <Badge type="warning" text="medium" />

::: details View Answer
Flask is a **micro-framework** — minimal core, you pick the pieces (great for small services/APIs and flexibility). Django is **batteries-included** — ORM, admin, auth, forms out of the box (great for large, full-featured apps fast). Flask = flexibility; Django = convention + completeness.
:::

## What is TensorFlow? <Badge type="tip" text="easy" />

::: details View Answer
An open-source deep-learning framework (Google) for building and training neural networks, with autodiff, GPU/TPU acceleration, and deployment tooling. Keras is its high-level API.
:::

## What is PyTorch? <Badge type="tip" text="easy" />

::: details View Answer
A deep-learning framework (Meta) known for its Pythonic, dynamic computation graphs (define-by-run) — popular in research. Provides tensors, autograd, and GPU acceleration.
:::

## How does BeautifulSoup work? <Badge type="warning" text="medium" />

::: details View Answer
It parses HTML/XML into a navigable tree so you can search by tag, attribute, or CSS selector to extract data.

```python
from bs4 import BeautifulSoup
soup = BeautifulSoup(html, "html.parser")
soup.find("h1").text
soup.select("a.link")        # CSS selector
```
:::