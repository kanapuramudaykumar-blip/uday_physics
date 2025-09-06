from django.contrib import admin
from .models import Publication, ResearchProject, ContactMessage

@admin.register(Publication)
class PublicationAdmin(admin.ModelAdmin):
    list_display = ['title', 'category', 'journal', 'volume', 'page_no', 'publication_date']
    list_filter = ['category', 'publication_date', 'journal']
    search_fields = ['title', 'authors']

@admin.register(ResearchProject)
class ResearchProjectAdmin(admin.ModelAdmin):
    list_display = ['title', 'sponsor', 'status']
    list_filter = ['status', 'sponsor']
    search_fields = ['title', 'description']

@admin.register(ContactMessage)
class ContactMessageAdmin(admin.ModelAdmin):
    list_display = ['name', 'email', 'subject', 'created_at']
    list_filter = ['created_at']
    search_fields = ['name', 'email', 'subject']
    readonly_fields = ['created_at']