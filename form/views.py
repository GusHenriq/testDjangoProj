from django.shortcuts import render
from django.http import HttpResponse
from .forms import NameForm

# Create your views here.
def form(request):
    form = NameForm(request.POST)
    return render(request, 'form.html', {'form': form})