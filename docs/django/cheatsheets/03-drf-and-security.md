# Django: DRF and Security

## 1. Django REST Framework (DRF) Core Components

### Serializers
Transform complex data types (querysets/models) to Python datatypes & render to JSON/XML.

| Type | Description | Common Use Case |
|---|---|---|
| `Serializer` | Base class, defines fields manually | Custom data validation, non-model data |
| `ModelSerializer` | Automatically generates fields from a Model | Quick CRUD endpoints |
| `HyperlinkedModelSerializer` | Uses hyperlinks instead of primary keys | RESTful APIs with discoverability |

```python
from rest_framework import serializers
from .models import User, Profile

class UserSerializer(serializers.ModelSerializer):
    # Custom field
    full_name = serializers.SerializerMethodField()
    
    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'full_name']
        read_only_fields = ['id']
        extra_kwargs = {'password': {'write_only': True}}
        
    def get_full_name(self, obj):
        return f"{obj.first_name} {obj.last_name}"

    def validate_email(self, value):
        if "@company.com" not in value:
            raise serializers.ValidationError("Invalid domain.")
        return value
```

### Views & ViewSets
Handle HTTP requests and return responses.

| Component | Description | Routing |
|---|---|---|
| `APIView` | Base class for DRF views (replaces Django's `View`) | Manual URL mapping |
| `GenericAPIView` | Extends `APIView`, adds queryset & serializer logic | Manual URL mapping |
| `Mixins` | Reusable actions (`CreateModelMixin`, `ListModelMixin`, etc.) | Used with `GenericAPIView` |
| `ViewSet` | Combines logic for multiple related views (list, retrieve) | Routers |
| `ModelViewSet` | Full CRUD operations automatically | Routers |

```python
from rest_framework import viewsets, mixins, generics
from .models import Post
from .serializers import PostSerializer

# ViewSet approach (Auto-Routing)
class PostViewSet(viewsets.ModelViewSet):
    queryset = Post.objects.all()
    serializer_class = PostSerializer

# Generic View approach (Manual Routing)
class PostListCreateView(generics.ListCreateAPIView):
    queryset = Post.objects.all()
    serializer_class = PostSerializer
```

### Routers
Automatically wire up ViewSets to URLs.

```python
from rest_framework.routers import DefaultRouter
from django.urls import path, include
from .views import PostViewSet

router = DefaultRouter()
router.register(r'posts', PostViewSet, basename='post')

urlpatterns = [
    path('api/', include(router.urls)),
]
```

## 2. Authentication & Permissions

### Authentication Schemes
Defines *who* the user is. Configured globally in `settings.py` or per-view.

```python
# settings.py
REST_FRAMEWORK = {
    'DEFAULT_AUTHENTICATION_CLASSES': [
        'rest_framework.authentication.SessionAuthentication', # Session/Cookie
        'rest_framework.authentication.BasicAuthentication',   # HTTP Basic (Testing)
        'rest_framework.authentication.TokenAuthentication',   # Simple Token (Need authtoken app)
        'rest_framework_simplejwt.authentication.JWTAuthentication', # JWT (Recommended for APIs)
    ],
}
```

**JWT (Simple JWT):**
```python
# urls.py
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
urlpatterns = [
    path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
]
```

### Permissions
Defines *what* the user can do.

| Permission Class | Description |
|---|---|
| `AllowAny` | Unrestricted access |
| `IsAuthenticated` | Must be logged in |
| `IsAdminUser` | `request.user.is_staff` must be True |
| `IsAuthenticatedOrReadOnly`| Read-only for anonymous, full access for authenticated |
| `DjangoModelPermissions` | Ties to Django's standard model permissions |

**Applying Permissions:**
```python
from rest_framework.permissions import IsAuthenticated
from .permissions import IsOwnerOrReadOnly # Custom permission

class SecureView(APIView):
    permission_classes = [IsAuthenticated, IsOwnerOrReadOnly]
```

**Custom Permission:**
```python
from rest_framework import permissions

class IsOwnerOrReadOnly(permissions.BasePermission):
    def has_object_permission(self, request, view, obj):
        if request.method in permissions.SAFE_METHODS: # GET, HEAD, OPTIONS
            return True
        return obj.owner == request.user
```

## 3. Django Web Security Best Practices

### Global Security Settings (`settings.py`)

| Setting | Purpose | Recommended Value (Prod) |
|---|---|---|
| `DEBUG` | Debug mode | `False` |
| `SECRET_KEY` | Crypto signing | Load from Env Var |
| `ALLOWED_HOSTS` | Host header validation | `['yourdomain.com']` |
| `SECURE_SSL_REDIRECT` | Force HTTPS | `True` |
| `SESSION_COOKIE_SECURE` | Cookies over HTTPS only | `True` |
| `CSRF_COOKIE_SECURE` | CSRF cookie over HTTPS only| `True` |
| `SECURE_HSTS_SECONDS` | HTTP Strict Transport Sec | `31536000` (1 year) |

### CORS (Cross-Origin Resource Sharing)
Requires `django-cors-headers`.

```python
# settings.py
INSTALLED_APPS += ['corsheaders']
MIDDLEWARE.insert(0, 'corsheaders.middleware.CorsMiddleware')

CORS_ALLOWED_ORIGINS = [
    "https://frontend.domain.com",
]
# OR allow all (not recommended for sensitive APIs): CORS_ALLOW_ALL_ORIGINS = True
```

### Attack Vectors & Mitigation

| Threat | Description | Django/DRF Mitigation |
|---|---|---|
| **SQL Injection** | Malicious SQL executed via inputs | Use Django ORM. Avoid `RawSQL` and `cursor.execute()`. |
| **XSS (Cross-Site Scripting)** | Injecting JS into web pages | Django templates auto-escape. APIs (DRF) don't execute JS, frontend must sanitize. |
| **CSRF (Cross-Site Request Forgery)** | Forged requests from authenticated users | Django uses `CsrfViewMiddleware`. DRF Session Auth needs CSRF token (`X-CSRFToken`). JWT/Token Auth are immune (if not stored in cookies). |
| **Clickjacking** | UI redressing | `XFrameOptionsMiddleware` (default `DENY`). |
| **Brute Force / DDoS** | Spamming endpoints | DRF Throttling, Fail2ban, Web Application Firewall (WAF). |

### Throttling (Rate Limiting) in DRF
```python
# settings.py
REST_FRAMEWORK = {
    'DEFAULT_THROTTLE_CLASSES': [
        'rest_framework.throttling.AnonRateThrottle',
        'rest_framework.throttling.UserRateThrottle'
    ],
    'DEFAULT_THROTTLE_RATES': {
        'anon': '100/day',
        'user': '1000/day'
    }
}
```

```python
# Per-view throttling
from rest_framework.throttling import UserRateThrottle
class MyView(APIView):
    throttle_classes = [UserRateThrottle]
```
