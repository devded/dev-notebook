# Django: Views, Templates, and URLs

## 1. URLs (`urls.py`)

### Basics & Routing
```python
from django.urls import path, re_path, include
from . import views

urlpatterns = [
    path('articles/2003/', views.special_case_2003),
    path('articles/<int:year>/', views.year_archive, name='news-year-archive'),
    path('articles/<int:year>/<int:month>/', views.month_archive),
    path('articles/<slug:slug>/', views.article_detail),
    re_path(r'^articles/(?P<year>[0-9]{4})/$', views.year_archive), # Regex
    path('blog/', include('blog.urls')), # Include other URLconfs
]
```

### Path Converters
| Converter | Matches | Example |
| :--- | :--- | :--- |
| `str` | Any non-empty string, excluding path separator `/` | `path('user/&lt;str:username&gt;/', ...)` |
| `int` | Zero or any positive integer | `path('post/&lt;int:id&gt;/', ...)` |
| `slug` | ASCII letters/numbers, hyphens, underscores | `path('post/&lt;slug:slug&gt;/', ...)` |
| `uuid` | A formatted UUID | `path('id/&lt;uuid:pk&gt;/', ...)` |
| `path` | Any non-empty string, including `/` | `path('files/&lt;path:file_path&gt;/', ...)` |

### Reverse Resolution
```python
from django.urls import reverse, reverse_lazy

# In views
url = reverse('news-year-archive', args=(2023,))
url = reverse('news-year-archive', kwargs={'year': 2023})
```

---

## 2. Views (`views.py`)

### Function-Based Views (FBV)
```python
from django.shortcuts import render, get_object_or_404, redirect
from django.http import HttpResponse, JsonResponse, Http404
from .models import Article

def article_detail(request, year):
    # Fetch data
    article = get_object_or_404(Article, year=year)
    
    # Return Template
    return render(request, 'news/article_detail.html', {'article': article})

def json_view(request):
    return JsonResponse({'foo': 'bar'})

def redirect_view(request):
    return redirect('news-year-archive', year=2023)
```

### Class-Based Views (CBV)
```python
from django.views import View
from django.views.generic import TemplateView, ListView, DetailView, CreateView, UpdateView, DeleteView
from django.urls import reverse_lazy
from .models import Article

# Basic CBV
class MyView(View):
    def get(self, request, *args, **kwargs):
        return HttpResponse('Hello, World!')

# Generic Display Views
class ArticleListView(ListView):
    model = Article
    template_name = 'article_list.html'
    context_object_name = 'articles' # default is object_list
    paginate_by = 10

class ArticleDetailView(DetailView):
    model = Article
    template_name = 'article_detail.html'
    context_object_name = 'article' # default is object

# Generic Edit Views
class ArticleCreateView(CreateView):
    model = Article
    fields = ['title', 'content']
    success_url = reverse_lazy('article-list')

class ArticleUpdateView(UpdateView):
    model = Article
    fields = ['title', 'content']

class ArticleDeleteView(DeleteView):
    model = Article
    success_url = reverse_lazy('article-list')
```

### Useful View Decorators/Mixins
| Type | Name | Purpose |
| :--- | :--- | :--- |
| **FBV** | `@login_required` | Requires user to be logged in |
| **FBV** | `@permission_required('app.perm')` | Requires specific permission |
| **FBV** | `@require_http_methods(["GET", "POST"])` | Restricts allowed HTTP methods |
| **CBV** | `LoginRequiredMixin` | Requires user to be logged in |
| **CBV** | `PermissionRequiredMixin` | Requires specific permission |

---

## 3. Templates

### Configuration (`settings.py`)
```python
TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [BASE_DIR / 'templates'], # Global templates dir
        'APP_DIRS': True, # Look in app/templates/
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]
```

### Template Tags
| Tag | Syntax | Description |
| :--- | :--- | :--- |
| Variable | `&#123;&#123; variable_name &#125;&#125;` | Outputs a variable |
| For Loop | `{% for item in list %}...{% endfor %}` | Iterates over a sequence |
| If/Else | `{% if cond %}...{% elif cond %}...{% else %}...{% endif %}` | Conditional logic |
| URL | `{% url 'view-name' arg1 %}` | Returns absolute path for view |
| Static | `{% static 'css/style.css' %}` | Links to static files (requires `{% load static %}`) |
| CSRF | `{% csrf_token %}` | Cross Site Request Forgery protection for forms |
| Include | `{% include 'partial.html' %}` | Includes another template |
| Comment | `{# single line #}` or `{% comment %} multi {% endcomment %}` | Comments out code |
| With | `{% with var=complex.query %}` | Caches a complex variable |

### Template Inheritance
**`base.html` (Parent)**
```html
<!DOCTYPE html>
<html>
<head>
    <title>{% block title %}My Site{% endblock %}</title>
</head>
<body>
    <header>Nav Bar</header>
    <main>
        {% block content %}
        Default content goes here.
        {% endblock %}
    </main>
</body>
</html>
```

**`page.html` (Child)**
```html
{% extends 'base.html' %}

{% block title %}Specific Page Title{% endblock %}

{% block content %}
    <h1>This is the specific page content</h1>
    &#123;&#123; block.super &#125;&#125; <!-- Renders parent block content too -->
{% endblock %}
```

### Common Filters
| Filter | Example | Description |
| :--- | :--- | :--- |
| `date` | `&#123;&#123; pub_date|date:"F j, Y" &#125;&#125;` | Formats a date |
| `default` | `&#123;&#123; var|default:"N/A" &#125;&#125;` | Fallback if false/empty |
| `length` | `&#123;&#123; my_list|length &#125;&#125;` | Returns length of list/string |
| `lower`/`upper` | `&#123;&#123; name|lower &#125;&#125;` | Converts to lower/uppercase |
| `truncatewords`| `&#123;&#123; bio|truncatewords:30 &#125;&#125;` | Truncates to N words |
| `safe` | `&#123;&#123; html_string|safe &#125;&#125;` | Marks string as safe (don't escape HTML) |
| `join` | `&#123;&#123; list|join:", " &#125;&#125;` | Joins a list with a string |

### Context & Request Attributes (Available by default)
*   `&#123;&#123; request.user &#125;&#125;`: Current logged in user (or AnonymousUser)
*   `&#123;&#123; request.path &#125;&#125;`: Current URL path
*   `&#123;&#123; request.GET.q &#125;&#125;`: Access query params (e.g., `?q=search`)
