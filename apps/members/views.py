from django.shortcuts import render

def member_list(request):
    return render(request, 'members/member_list.html')