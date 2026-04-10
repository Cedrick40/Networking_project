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
    """User dashboard view"""
    posts = Post.objects.all()[:10]  # Get latest 10 posts
    context = {
        'user': request.user,
        'posts': posts,
        'has_seen_welcome': request.user.has_seen_welcome,
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