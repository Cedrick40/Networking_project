from django.shortcuts import render

def home(request):
    return render(request, 'networking_home.html')