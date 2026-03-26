from django.shortcuts import render
from django.contrib.auth.models import User
from apps.projects.models import Project
from apps.members.models import Member
from apps.events.models import Event
from apps.jobs.models import Job
from django.http import JsonResponse

def home(request):
    return render(request, 'core/home.html')

def search(request):
    query = request.GET.get('q', '').strip()
    results = []
    
    if query:
        # Search in Members (Users)
        members = User.objects.filter(
            username__icontains=query
        ) | User.objects.filter(
            profile__bio__icontains=query
        ) | User.objects.filter(
            profile__job_title__icontains=query
        )
        
        # Search in Projects (if model exists)
        # projects = Project.objects.filter(title__icontains=query) | Project.objects.filter(description__icontains=query)
        
        # Search in Events
        # events = Event.objects.filter(title__icontains=query) | Event.objects.filter(description__icontains=query)
        
        # Build results list
        for member in members[:10]:
            results.append({
                'title': member.username,
                'description': getattr(member, 'bio', 'No bio available')[:200],
                'url': f'/members/{member.id}/',
                'type': 'member'
            })
    
    return render(request, 'core/search.html', {
        'query': query,
        'results': results
    })

def about(request):
    return render(request, 'core/about.html')
def contact(request):
    return render(request, 'core/contact.html')

def services(request):
    return render(request, 'core/services.html')