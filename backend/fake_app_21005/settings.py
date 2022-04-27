"""
Django settings for fake_app_21005 project.
Generated by 'django-admin startproject' using Django 2.2.2.
For more information on this file, see
https://docs.djangoproject.com/en/2.2/topics/settings/
For the full list of settings and their values, see
https://docs.djangoproject.com/en/2.2/ref/settings/
"""

import os
import environ

env = environ.Env()

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = env.bool("DEBUG", default=False)

# Build paths inside the project like this: os.path.join(BASE_DIR, ...)
BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))


# Quick-start development settings - unsuitable for production
# See https://docs.djangoproject.com/en/2.2/howto/deployment/checklist/

# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = env.str("SECRET_KEY")

ALLOWED_HOSTS = env.list("HOST", default=["*"])
SITE_ID = 1

SECURE_PROXY_SSL_HEADER = ("HTTP_X_FORWARDED_PROTO", "https")
SECURE_SSL_REDIRECT = env.bool("SECURE_REDIRECT", default=False)

# Application definition

INSTALLED_APPS = [
    "django.contrib.admin",
    "django.contrib.auth",
    "django.contrib.contenttypes",
    "django.contrib.sessions",
    "django.contrib.messages",
    "django.contrib.staticfiles",
    "django.contrib.sites",
]
LOCAL_APPS = [
    "home",
    "users.apps.UsersConfig",
    "recipe",
    "feed",
    "comment",
    "bookmarks",
    "groceries",
    "user_profile",
    "feedback",
    "recipe_category",
    "recipe_section",
    "recipe_ingredient",
    "report",
    "notification",
]
THIRD_PARTY_APPS = [
    "rest_framework",
    "rest_framework.authtoken",
    "rest_auth",
    "rest_auth.registration",
    "bootstrap4",
    "allauth",
    "allauth.account",
    "allauth.socialaccount",
    "allauth.socialaccount.providers.google",
    "allauth.socialaccount.providers.facebook",
    "django_extensions",
    "drf_yasg",
    "drf_multiple_model",
    "django_filters",
    "actstream",
    "corsheaders",
    # start fcm_django push notifications
    "fcm_django",
    # end fcm_django push notifications
    "drf_extra_fields",
]
INSTALLED_APPS += LOCAL_APPS + THIRD_PARTY_APPS

MIDDLEWARE = [
    "corsheaders.middleware.CorsMiddleware",
    "django.middleware.security.SecurityMiddleware",
    "django.contrib.sessions.middleware.SessionMiddleware",
    "django.middleware.common.CommonMiddleware",
    "django.middleware.csrf.CsrfViewMiddleware",
    "django.contrib.auth.middleware.AuthenticationMiddleware",
    "django.contrib.messages.middleware.MessageMiddleware",
    "django.middleware.clickjacking.XFrameOptionsMiddleware",
]

ROOT_URLCONF = "fake_app_21005.urls"

TEMPLATES = [
    {
        "BACKEND": "django.template.backends.django.DjangoTemplates",
        "DIRS": [os.path.join(BASE_DIR, "templates",os.path.join(BASE_DIR, "../../landing-page"))],
        "APP_DIRS": True,
        "OPTIONS": {
            "context_processors": [
                "django.template.context_processors.debug",
                "django.template.context_processors.request",
                "django.contrib.auth.context_processors.auth",
                "django.contrib.messages.context_processors.messages",
            ],
        },
    },
]

WSGI_APPLICATION = "fake_app_21005.wsgi.application"


# Database
# https://docs.djangoproject.com/en/2.2/ref/settings/#databases

DATABASES = {
    "default": {
        "ENGINE": "django.db.backends.sqlite3",
        "NAME": os.path.join(BASE_DIR, "db.sqlite3"),
    }
}

if env.str("DATABASE_URL", default=None):
    DATABASES = {"default": env.db()}


# Password validation
# https://docs.djangoproject.com/en/2.2/ref/settings/#auth-password-validators

AUTH_PASSWORD_VALIDATORS = [
    {
        "NAME": "django.contrib.auth.password_validation.UserAttributeSimilarityValidator",
    },
    {
        "NAME": "django.contrib.auth.password_validation.MinimumLengthValidator",
    },
    {
        "NAME": "django.contrib.auth.password_validation.CommonPasswordValidator",
    },
    {
        "NAME": "django.contrib.auth.password_validation.NumericPasswordValidator",
    },
]


# Internationalization
# https://docs.djangoproject.com/en/2.2/topics/i18n/

LANGUAGE_CODE = "en-us"
TIME_ZONE = "UTC"
USE_I18N = True
USE_L10N = True
USE_TZ = True


# Static files (CSS, JavaScript, Images)
# https://docs.djangoproject.com/en/2.2/howto/static-files/

STATIC_URL = "/static/"

MIDDLEWARE += ["whitenoise.middleware.WhiteNoiseMiddleware"]

AUTHENTICATION_BACKENDS = (
    "django.contrib.auth.backends.ModelBackend",
    "allauth.account.auth_backends.AuthenticationBackend",
)

STATIC_ROOT = os.path.join(BASE_DIR, "staticfiles")
STATICFILES_DIRS = [os.path.join(BASE_DIR, "static")]
STATICFILES_STORAGE = "whitenoise.storage.CompressedManifestStaticFilesStorage"

# allauth / users
ACCOUNT_EMAIL_REQUIRED = True
ACCOUNT_AUTHENTICATION_METHOD = "email"
ACCOUNT_USERNAME_REQUIRED = False
ACCOUNT_EMAIL_VERIFICATION = "mandatory"
ACCOUNT_CONFIRM_EMAIL_ON_GET = True
ACCOUNT_LOGIN_ON_EMAIL_CONFIRMATION = True
ACCOUNT_UNIQUE_EMAIL = True
LOGIN_REDIRECT_URL = "users:redirect"

ACCOUNT_ADAPTER = "users.adapters.AccountAdapter"
SOCIALACCOUNT_ADAPTER = "users.adapters.SocialAccountAdapter"
ACCOUNT_ALLOW_REGISTRATION = env.bool("ACCOUNT_ALLOW_REGISTRATION", True)
SOCIALACCOUNT_ALLOW_REGISTRATION = env.bool(
    "SOCIALACCOUNT_ALLOW_REGISTRATION", True)

REST_AUTH_SERIALIZERS = {
    # Replace password reset serializer to fix 500 error
    "PASSWORD_RESET_SERIALIZER": "home.api.v1.serializers.PasswordSerializer",
}
REST_AUTH_REGISTER_SERIALIZERS = {
    # Use custom serializer that has no username and matches web signup
    "REGISTER_SERIALIZER": "home.api.v1.serializers.SignupSerializer",
}

# Custom user model
AUTH_USER_MODEL = "users.User"
EMAIL_HOST = env.str("EMAIL_HOST", "smtp.sendgrid.net")
EMAIL_HOST_USER = "apikey"
EMAIL_HOST_PASSWORD = env.str("SENDGRID_PASSWORD", "")
EMAIL_PORT = 587
EMAIL_USE_TLS = True

DEFAULT_FROM_EMAIL = env.str("SENDGRID_USERNAME", "")
SENDGRID_SANDBOX_MODE_IN_DEBUG = False


AWS_ACCESS_KEY_ID = env.str("AWS_ACCESS_KEY_ID", "")
AWS_SECRET_ACCESS_KEY = env.str("AWS_SECRET_ACCESS_KEY", "")
DEFAULT_FILE_STORAGE = "storages.backends.s3boto3.S3Boto3Storage"
AWS_STORAGE_BUCKET_NAME = env.str("AWS_STORAGE_BUCKET_NAME", "")
AWS_S3_REGION_NAME = env.str("AWS_STORAGE_REGION", "")

# start fcm_django push notifications
FCM_DJANGO_SETTINGS = {"FCM_SERVER_KEY": env.str("FCM_SERVER_KEY", "")}
# end fcm_django push notifications

# Customer IO
CUSTOMER_IO_API_KEY = env.str("CUSTOMER_IO_API_KEY", "")
CUSTOMER_IO_SITE_ID = env.str("CUSTOMER_IO_SITE_ID", "")
# Swagger settings for api docs
SWAGGER_SETTINGS = {
    "DEFAULT_INFO": f"{ROOT_URLCONF}.api_info",
}

if DEBUG:
    # output email to console instead of sending
    EMAIL_BACKEND = "django.core.mail.backends.console.EmailBackend"

# DJANGO REST FRAMEWORK SETTINGS
REST_FRAMEWORK = {
    "DEFAULT_PAGINATION_CLASS": "rest_framework.pagination.PageNumberPagination",
    "PAGE_SIZE": 100,
    "EXCEPTION_HANDLER": "utils.exceptions.custom_exception_handler",
    "DEFAULT_AUTHENTICATION_CLASSES": (
        "rest_framework.authentication.TokenAuthentication",
        "rest_framework.authentication.SessionAuthentication",
    ),
    "DEFAULT_PERMISSION_CLASSES": ["rest_framework.permissions.IsAuthenticated"],
}

REST_AUTH_SERIALIZERS = {
    "TOKEN_SERIALIZER": "home.api.v1.serializers.TokenSerializer",
}


ACTSTREAM_SETTINGS = {
    "FETCH_RELATIONS": True,
    "USE_PREFETCH": True,
    "USE_JSONFIELD": True,
    "GFK_FETCH_DEPTH": 1,
}

LOGGING = {
    "version": 1,
    "disable_existing_loggers": False,
    "handlers": {
        "console": {
            "class": "logging.StreamHandler",
        },
    },
    "loggers": {
        "django.request": {
            "handlers": ["console"],
            "level": "DEBUG",  # change debug level as appropiate
            "propagate": False,
        },
    },
}

EMAIL_BACKEND = "django.core.mail.backends.smtp.EmailBackend"

CORS_ALLOW_ALL_ORIGINS = True

# SCALE
SCALE_PROJECT_NAME_IMAGE = env.str("SCALE_PROJECT_NAME_IMAGE", "")
SCALE_PROJECT_NAME_WEBSITE = env.str("SCALE_PROJECT_NAME_WEBSITE", "")
SCALE_API_KEY = env.str("SCALE_API_KEY", "")
SCALE_IMAGE_INSTRUCTIONS = env.str("SCALE_IMAGE_INSTRUCTIONS", "")
SCALE_WEBSITE_INSTRUCTIONS = env.str("SCALE_WEBSITE_INSTRUCTIONS", "")


# AWS S3 config
AWS_ACCESS_KEY_ID = env.str("AWS_ACCESS_KEY_ID", "")
AWS_SECRET_ACCESS_KEY = env.str("AWS_SECRET_ACCESS_KEY", "")
AWS_STORAGE_BUCKET_NAME = env.str("AWS_STORAGE_BUCKET_NAME", "")
AWS_STORAGE_REGION = env.str("AWS_STORAGE_REGION", "")

USE_S3 = (
    AWS_ACCESS_KEY_ID
    and AWS_SECRET_ACCESS_KEY
    and AWS_STORAGE_BUCKET_NAME
    and AWS_STORAGE_REGION
)

if USE_S3:
    AWS_S3_SIGNATURE_VERSION = "s3v4"
    AWS_S3_CUSTOM_DOMAIN = env.str("AWS_S3_CUSTOM_DOMAIN", "")
    AWS_S3_OBJECT_PARAMETERS = {"CacheControl": "max-age=86400"}
    AWS_DEFAULT_ACL = env.str("AWS_DEFAULT_ACL", "public-read")
    AWS_MEDIA_LOCATION = env.str("AWS_MEDIA_LOCATION", "media")
    AWS_AUTO_CREATE_BUCKET = env.bool("AWS_AUTO_CREATE_BUCKET", True)
    AWS_QUERYSTRING_AUTH = False
    DEFAULT_FILE_STORAGE = env.str(
        "DEFAULT_FILE_STORAGE", "home.storage_backends.MediaStorage"
    )
