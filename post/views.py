from django.shortcuts import render,redirect,get_object_or_404, redirect
from django.http import HttpResponse, HttpResponseRedirect
from .forms import *
# Create your views here.
from .models import *
from authy.models import *
from django.template import loader
from django.contrib.auth.decorators import login_required
from stories.models import Story, StoryStream
from comment.models import Comment
from comment.forms import CommentForm
from django.http import HttpResponse

@login_required
def index(request):
	user = request.user
	posts = Stream.objects.filter(user=user)
	stories = StoryStream.objects.filter(user=user)

	
	


	group_ids = []

	for post in posts:
		group_ids.append(post.post_id)
		
	post_items = Post.objects.filter(id__in=group_ids).all().order_by('-posted')	


	notifications = Notification.objects.filter(user=user).order_by('-date')
	Notification.objects.filter(user=user, is_seen=False).update(is_seen=True)
	

	template = loader.get_template('index.html')

	context = {
		'post_items': post_items,
		'notifications': notifications,
		'stories': stories,
	}

	return HttpResponse(template.render(context, request))


def NewPost(request):
	user = request.user.id
	tags_objs = []


	if request.method == 'POST':
		form = NewPostForm(request.POST, request.FILES)
		if form.is_valid():
			picture = form.cleaned_data.get('picture')
			caption = form.cleaned_data.get('caption')
			tags_form = form.cleaned_data.get('tags')

			tags_list = list(tags_form.split(','))

			for tag in tags_list:
				t, created = Tag.objects.get_or_create(title=tag)
				tags_objs.append(t)

			p,created =Post.objects.get_or_create(picture=picture,caption=caption,user_id=user)
			p.tags.set(tags_objs)
		
			p.save()
			return redirect('index')
	else:
		form = NewPostForm()

	context = {
		'form':form,
	
	}

	return render(request, 'newpost.html', context)

def PostDetails(request, post_id):
	post = get_object_or_404(Post, id=post_id)
	user = request.user

	favorited=False

	#comment
	comments = Comment.objects.filter(post=post).order_by('date')

	profile =Profile.objects.get(user=request.user)
	if profile.favorites.filter(id=post_id).exists():
		favorited=True

	#Comments Form
	if request.method == 'POST':
		form = CommentForm(request.POST)
		if form.is_valid():
			comment = form.save(commit=False)
			comment.post = post
			comment.user = user
			comment.save()
			return HttpResponseRedirect(reverse('postdetails', args=[post_id]))
	else:
		form = CommentForm()
	template = loader.get_template('post_detail.html')

	context = {
		'post':post,
		'form':form,
		'comments':comments,

		'profile':profile,
		'favorited':favorited

	
	}

	return HttpResponse(template.render(context, request))

def tags(request, tag_slug):
	tag = get_object_or_404(Tag, slug=tag_slug)
	posts = Post.objects.filter(tags=tag).order_by('-posted')

	template = loader.get_template('tag.html')

	context = {
		'posts':posts,
		'tag':tag,
	}

	return HttpResponse(template.render(context, request))


# postdetails likes------------------
def like(request, post_id):
	user = request.user
	post = Post.objects.get(id=post_id)
	current_likes = post.likes
	liked = Likes.objects.filter(user=user, post=post).count()

	if not liked:
		like = Likes.objects.create(user=user, post=post)
		#like.save()
		current_likes = current_likes + 1

	else:
		Likes.objects.filter(user=user, post=post).delete()
		current_likes = current_likes - 1

	post.likes = current_likes
	post.save()

	return HttpResponseRedirect(reverse('postdetails', args=[post_id]))



# indexlikes----------------

def likee(request, post_id):
	user = request.user
	post = Post.objects.get(id=post_id)
	current_likes = post.likes
	liked = Likes.objects.filter(user=user, post=post).count()

	if not liked:
		like = Likes.objects.create(user=user, post=post)
		#like.save()
		current_likes = current_likes + 1

	else:
		Likes.objects.filter(user=user, post=post).delete()
		current_likes = current_likes - 1

	post.likes = current_likes
	post.save()

	return HttpResponseRedirect(reverse('index' ))



def favorite(request, post_id):
	user = request.user
	post = Post.objects.get(id=post_id)
	profile = Profile.objects.get(user=user)

	if profile.favorites.filter(id=post_id).exists():
		profile.favorites.remove(post)

	else:
		profile.favorites.add(post)

	return HttpResponseRedirect(reverse('postdetails', args=[post_id]))


# ------index favourites-----------
def favoritee(request, post_id):
	user = request.user
	post = Post.objects.get(id=post_id)
	profile = Profile.objects.get(user=user)

	if profile.favorites.filter(id=post_id).exists():
		profile.favorites.remove(post)

	else:
		profile.favorites.add(post)

	return HttpResponseRedirect(reverse('postdetails', args=[post_id]))




from django.shortcuts import render, redirect
from django.template import loader
from django.http import HttpResponse

from .models import Notification
# Create your views here.



def DeleteNotification(request, noti_id):
	user = request.user
	Notification.objects.filter(id=noti_id, user=user).delete()
	return redirect('index')


def CountNotifications(request):
	count_notifications = 0
	if request.user.is_authenticated:
		count_notifications = Notification.objects.filter(user=request.user, is_seen=False).count()

	return {'count_notifications':count_notifications}
	



