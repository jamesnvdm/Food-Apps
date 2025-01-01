from django.shortcuts import render, redirect
from django.http import HttpResponse, HttpResponseRedirect, JsonResponse
from django.urls import reverse
import requests
import openai
import json
from django.views.decorators.csrf import csrf_exempt
from decouple import config

#openai.api_key = config("API_KEY")
openai.api_key = ''

def index(request):
    if request.method == "POST":
        cuisine = request.POST.get('cuisine')
        experience = request.POST.get('experience')
        comments = request.POST.get('comments')
        request.session['user_input'] = {'cuisine': cuisine, 'experience': experience, 'comments':comments, 'vibes':'vibes'}

        return render(request, 'index.html', {
            'cuisine':cuisine,
            'experience':experience,
            'comments':comments
        })
    
    return render(request, 'index.html')
    
@csrf_exempt
def chatgpt_proxy(request):
    body_unicode = request.body.decode('utf-8')
    body_data = json.loads(body_unicode)
    print(f'HELLO, {body_data}')
    if request.method == "POST":
        try:
            # Make the API call
            response = openai.ChatCompletion.create(
                model="gpt-4o-mini",  # Choose the model (e.g., "gpt-4" or "gpt-3.5-turbo")
                messages=[{"role": "user", "content": str(body_data)}],
                temperature=0.7,  # Adjust creativity (0-1)
            )
            # Extract and return the response text
            print(f'HELLO, {response}')
            stringResponse = response['choices'][0]['message']['content'].strip()
            print(stringResponse)
            return HttpResponse(stringResponse)
        except Exception as e:
            return f"An error occurred: {e}"