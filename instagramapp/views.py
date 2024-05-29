from django.shortcuts import render
from django.shortcuts import render, redirect, get_object_or_404
from django.shortcuts import render, redirect
from django.template import loader, RequestContext
from django.http import HttpResponse, HttpResponseRedirect, HttpResponseBadRequest
from authy.models import Profile
from django.contrib.auth.decorators import login_required

from django.contrib.auth.models import User
from direct.models import Message
from post.models import *
from django.urls import resolve
from django.db.models import Q
from django.core.paginator import Paginator
# Create your views here.

# Create your views here.
def index(request):
    return render(request,"index.html")




            
                


def UserProfile(request):
	user =request.user
	profile = Profile.objects.get(user=user)
	url_name = resolve(request.path).url_name
	
	if url_name == 'profile':
		posts = Post.objects.filter(user=user).order_by('-posted')

	else:
		posts = profile.favorites.all()

	#Profile info box
	posts_count = Post.objects.filter(user=user).count()
	following_count = Follow.objects.filter(follower=user).count()
	followers_count = Follow.objects.filter(following=user).count()

	#follow status
	follow_status = Follow.objects.filter(following=user, follower=request.user).exists()

	#Pagination
	paginator = Paginator(posts, 8)
	page_number = request.GET.get('page')
	posts_paginator = paginator.get_page(page_number)

	template = loader.get_template('profile.html')

	context = {
		'posts': posts_paginator,
		'profile':profile,
		'following_count':following_count,
		'followers_count':followers_count,
		'posts_count':posts_count,
		'follow_status':follow_status,
		'url_name':url_name,
	}

	return HttpResponse(template.render(context, request))