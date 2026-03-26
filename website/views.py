from django.shortcuts import render
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.http import require_POST
from django.core.paginator import Paginator
from .models import Publication, ResearchProject, ContactMessage, MyView
import json

def home(request):
    return render(request, 'home.html')

def about(request):
    my_views = MyView.objects.all()
    context = {'my_views': my_views}
    return render(request, 'about.html', context)

def research(request):
    projects = ResearchProject.objects.all()
    context = {'projects': projects}
    return render(request, 'research.html', context)

def publications(request):
    # Get category from URL parameter, default to 'journals'
    category = request.GET.get('category', 'journals')
    
    # Filter publications by category
    publications_list = Publication.objects.filter(category=category)
    
    # Pagination
    paginator = Paginator(publications_list, 5)
    page_number = request.GET.get('page')
    publications = paginator.get_page(page_number)
    
    # Get all categories for the dropdown
    categories = Publication.CATEGORY_CHOICES
    
    context = {
        'publications': publications,
        'categories': categories,
        'current_category': category
    }
    return render(request, 'publications.html', context)

def group(request):
    return render(request, 'group.html')

def gallery(request):
    return render(request, 'gallery.html')

def contact(request):
    return render(request, 'contact.html')

@csrf_exempt
@require_POST
def contact_submit(request):
    try:
        data = json.loads(request.body)
        contact_message = ContactMessage.objects.create(
            name=data.get('name'),
            email=data.get('email'),
            subject=data.get('subject'),
            message=data.get('message')
        )
        return JsonResponse({'status': 'success', 'message': 'Message sent successfully!'})
    except Exception as e:
        return JsonResponse({'status': 'error', 'message': 'Failed to send message.'})






from django.http import FileResponse, HttpResponseForbidden
from django.conf import settings
import os

def backup_db_view(request):
    token = request.GET.get("token")
    SECRET_TOKEN = os.environ.get("DB_DOWNLOAD_TOKEN")  # put this in Render env

    if token != SECRET_TOKEN:
        return HttpResponseForbidden("Unauthorized")

    db_path = os.path.join(settings.BASE_DIR, 'db.sqlite3')
    return FileResponse(open(db_path, 'rb'), as_attachment=True, filename='db.sqlite3')
