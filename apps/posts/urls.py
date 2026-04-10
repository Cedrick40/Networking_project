from django.urls import path
from . import views

app_name = 'posts'

urlpatterns = [
    path('', views.post_list, name='list'),
    path('create/', views.create_post, name='create'),
    path('<int:pk>/like/', views.like_post, name='like'),
    path('<int:pk>/comment/', views.add_comment, name='comment'),
    path('<int:pk>/delete/', views.delete_post, name='delete'),
    path('<int:pk>/edit/', views.edit_post, name='edit')
]