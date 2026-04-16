from django.shortcuts import render, redirect, get_object_or_404
from django.contrib.auth.forms import UserCreationForm
from django.contrib.auth import login, logout
from django.contrib.auth.decorators import login_required
from django.contrib import messages
from .forms import SignUpForm, ProfileForm
from .models import User
from apps.posts.models import Post
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.db.models import Count, Q
from apps.projects.models import Project
from apps.jobs.models import Job
from apps.events.models import Event
from django.utils import timezone

def logout_view(request):
    logout(request)
    messages.success(request, 'You have logged in successfully.')
    return redirect('core:home')

def signup(request):
    if request.method == 'POST':
        form = SignUpForm(request.POST)
        if form.is_valid():
            user = form.save()
            user.backend = 'django.contrib.auth.backends.ModelBackend'
            user.has_seen_welcome = False  # New user hasn't seen welcome
            user.save()
            login(request, user)
            messages.success(request, 'Account created successfully! Welcome to TechHoodNet!', extra_tags='persistent')
            return redirect('accounts:dashboard')
    else:
        form = SignUpForm()
    return render(request, 'accounts/signup.html', {'form': form})

def profile_view(request, username=None):
    """View public profile of a user"""
    if username:
        profile_user = get_object_or_404(User, username=username)
        # Increment profile views if not the owner
        if request.user.is_authenticated and request.user != profile_user:
            profile_user.profile_views += 1
            profile_user.save()
    else:
        if not request.user.is_authenticated:
            return redirect('accounts:login')
        profile_user = request.user
    
    return render(request, 'accounts/profile.html', {'profile_user': profile_user})

@login_required
def edit_profile(request):
    """Edit current user's profile"""
    if request.method == 'POST':
        form = ProfileForm(request.POST, request.FILES, instance=request.user)
        if form.is_valid():
            form.save()
            messages.success(request, 'Profile updated successfully!')
            return redirect('accounts:profile')
    else:
        form = ProfileForm(instance=request.user)
    
    return render(request, 'accounts/edit_profile.html', {'form': form})

@login_required
def dashboard(request):
    """User dashboard view with dynamic data"""
    
    # Get posts
    posts = Post.objects.all()[:10]
    
    # Get trending projects (ordered by views and likes)
    trending_projects = Project.objects.annotate(
        total_engagement=Count('likes') + Count('views')
    ).order_by('-total_engagement', '-views')[:4]
    
    # Get recent jobs
    recent_jobs = Job.objects.filter(is_active=True)[:4]
    
    # Get upcoming events
    upcoming_events = Event.objects.filter(date__gte=timezone.now())[:3]
    
    # Get suggested connections (random users except current user)
    suggested_connections = User.objects.exclude(id=request.user.id)[:3]
    
    # Get recent messages (mock data for now)
    recent_messages = [
        {'name': 'Sarah Johnson', 'message': 'Are you free to chat?', 'avatar': '👩‍💻', 'online': True},
        {'name': 'Michael Chen', 'message': "Let's catch up soon!", 'avatar': '👨‍💻', 'online': True},
        {'name': 'Emily Rodriguez', 'message': 'Great project!', 'avatar': '👩‍🎨', 'online': False},
    ]
    
    context = {
        'user': request.user,
        'posts': posts,
        'trending_projects': trending_projects,
        'recent_jobs': recent_jobs,
        'upcoming_events': upcoming_events,
        'suggested_connections': suggested_connections,
        'recent_messages': recent_messages,
    }
    return render(request, 'accounts/dashboard.html', context)

@login_required
def settings(request):
    """User settings view"""
    return render(request, 'accounts/settings.html', {'user': request.user})

@login_required
@csrf_exempt
def mark_welcome_seen(request):
    if request.method == 'POST':
        request.user.has_seen_welcome = True
        request.user.save()
        return JsonResponse({'success': True})
    return JsonResponse({'success': False})