# Django Tutorial Notes

Notes for the Django web framework (batteries-included, MVT pattern).

## Setup

```bash
python -m venv .venv && source .venv/bin/activate
pip install django
django-admin startproject mysite
cd mysite
python manage.py startapp blog
python manage.py runserver
```

## Project structure

```
mysite/
├── manage.py
├── mysite/          # project config
│   ├── settings.py
│   ├── urls.py
│   └── wsgi.py
└── blog/            # an app
    ├── models.py
    ├── views.py
    ├── urls.py
    └── admin.py
```

## Models

```python
from django.db import models

class Post(models.Model):
    title = models.CharField(max_length=200)
    body = models.TextField()
    created = models.DateTimeField(auto_now_add=True)
    published = models.BooleanField(default=False)

    def __str__(self):
        return self.title
```

```bash
python manage.py makemigrations
python manage.py migrate
```

## Views & URLs

```python
# views.py
from django.shortcuts import render, get_object_or_404
from .models import Post

def post_list(request):
    posts = Post.objects.filter(published=True)
    return render(request, "blog/list.html", {"posts": posts})

def post_detail(request, pk):
    post = get_object_or_404(Post, pk=pk)
    return render(request, "blog/detail.html", {"post": post})
```

```python
# urls.py
from django.urls import path
from . import views

urlpatterns = [
    path("", views.post_list, name="post_list"),
    path("<int:pk>/", views.post_detail, name="post_detail"),
]
```

## ORM cheatsheet

```python
Post.objects.all()
Post.objects.filter(published=True).order_by("-created")
Post.objects.get(pk=1)
Post.objects.create(title="Hi", body="...")
Post.objects.exclude(published=False)
Post.objects.filter(title__icontains="django")
Post.objects.count()
```

## Admin

```python
# admin.py
from django.contrib import admin
from .models import Post

admin.site.register(Post)
```

```bash
python manage.py createsuperuser
```

## Interview talking points

- **MVT** = Model, View, Template (Django's take on MVC).
- **Migrations** track schema changes in version control.
- **QuerySets are lazy** — no DB hit until evaluated.
- Use `select_related` (FK joins) and `prefetch_related` (M2M) to avoid N+1 queries.
- **Django REST Framework** for building APIs.
