from django.shortcuts import render, redirect, get_object_or_404
from django.contrib.auth.decorators import login_required
from django.contrib import messages
from django.http import JsonResponse
from .models import Post, Comment


@login_required
def post_list(request):
    posts = Post.objects.all()
    return render(request, 'posts/feed.html', {'posts': posts})

@login_required
def create_post(request):
    if request.method == 'POST':
        content = request.POST.get('content')
        if content:
            Post.objects.create(author=request.user, content=content)
            messages.success(request, 'Post created successfully!')
        else:
            messages.error(request, 'Post content cannot be empty!')
    
    next_url = request.POST.get('next', 'accounts:dashboard')
    return redirect(next_url)

@login_required
def like_post(request, pk):
    post = get_object_or_404(Post, pk=pk)
    if request.user in post.likes.all():
        post.likes.remove(request.user)
        liked = False
    else:
        post.likes.add(request.user)
        liked = True
    return JsonResponse({'liked': liked, 'count': post.likes.count()})

@login_required
def add_comment(request, pk):
    post = get_object_or_404(Post, pk=pk)
    if request.method == 'POST':
        content = request.POST.get('content')
        if content:
            Comment.objects.create(post=post, author=request.user, content=content)
            messages.success(request, 'Comment added!')
        else:
            messages.error(request, 'Comment cannot be empty!')
    return redirect(request.META.get('HTTP_REFERER', 'accounts:dashboard'))

@login_required
def delete_post(request, pk):
    post = get_object_or_404(Post, pk=pk)
    if post.author == request.user:
        post.delete()
        return JsonResponse({'success': True, 'message': 'Post deleted successfully!'})
    else:
        return JsonResponse({'success': False, 'error': 'You cannot delete this post!'}, status=403)
@login_required
def edit_post(request, pk):
    post = get_object_or_404(Post, pk=pk)
    if post.author != request.user:
        messages.error(request, 'You cannot edit this post!')
        return redirect('accounts:dashboard')
    
    if request.method == 'POST':
        content = request.POST.get('content')
        if content:
            post.content = content
            post.save()
            messages.success(request, 'Post updated successfully!')
        else:
            messages.error(request, 'Post content cannot be empty!')
        return redirect('accounts:dashboard')
    
    return render(request, 'posts/edit_post.html', {'post': post})