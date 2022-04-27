from django.contrib import admin

from .models import BookmarkGroup, Bookmark


admin.site.register(BookmarkGroup)
admin.site.register(Bookmark)