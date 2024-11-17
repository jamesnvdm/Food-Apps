from django.shortcuts import render, redirect
from django.http import HttpResponse

def index(request):
    if request.method == "POST":
        cuisine = request.POST.get('cuisine')
        experience = request.POST.get('experience')
        comments = request.POST.get('comments')

        return render(request, 'index.html', {
            'cuisine':cuisine,
            'experience':experience,
            'comments':comments
        })
        # return redirect('result', cuisine=cuisine, experience=experience, comments=comments)
    return render(request, 'index.html')

def result(request):
    if request.method == 'GET':
        cuisine = request.GET.get('cuisine')
        experience = request.GET.get('experience')
        comments = request.GET.get('comments')

        return render(request, 'result.html', {
            'cuisine':cuisine,
            'experience':experience,
            'comments':comments
        })