from django.db import models
from django.contrib.auth.models import User


from django.db.models.signals import post_save, post_delete
from django.utils.text import slugify
from django.urls import reverse

from django.conf import settings
import os
import uuid
import datetime 
from django.utils import timezone

def user_directory_path(request,filename):
    now_time=datetime.datetime.now().strftime("%Y%m%d%H:%M:%S")
    new_filename="%s%s"%(now_time,filename)
    return os.path.join('post/',new_filename)

# def user_directory_path(instance,filename):
#     post= 'user_{0}/{1}',format(instance.user.id,filename)
#     full_path = os.path.join(settings.MEDIA_ROOT, post)

#     if os.path.exists(full_path):
#         os.remove(full_path)
#         return post


class Tag(models.Model):
    title = models.CharField(max_length=75,verbose_name='Tag')
    slug=models.SlugField(null=False,unique=True)

    class Meta:
        verbose_name_plural='Tags'

    def get_absolute_url(self):
        return reverse('tags',args=[self.slug])
    
    def __str__(self):
        return self.title

    def save(self,*args,**kwargs):
        if not self.slug:
            self.slug =slugify(self.title)
        return super().save(*args,**kwargs)
    


class Post(models.Model):
	id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
	picture=models.ImageField(upload_to=user_directory_path,verbose_name='Picture',null=False)
	caption = models.TextField(max_length=1500, verbose_name='Caption')
	posted = models.DateTimeField(auto_now_add=True)
	tags = models.ManyToManyField(Tag, related_name='tags')
	user = models.ForeignKey(User, on_delete=models.CASCADE)
	likes = models.IntegerField(default=0)


	def get_absolute_url(self):
		return reverse('postdetails', args=[str(self.id)])

	def __str__(self):
		return str(self.posted)
     


class Follow(models.Model):
	follower = models.ForeignKey(User,on_delete=models.CASCADE, null=True, related_name='follower')
	following = models.ForeignKey(User,on_delete=models.CASCADE, null=True, related_name='following')
      
	def user_follow(sender, instance, *args, **kwargs):
		follow = instance
		sender = follow.follower
		following = follow.following
		notify = Notification(sender=sender, user=following, notification_type=3)
		notify.save()

	def user_unfollow(sender, instance, *args, **kwargs):
		follow = instance
		sender = follow.follower
		following = follow.following

		notify = Notification.objects.filter(sender=sender, user=following, notification_type=3)
		notify.delete()


class Stream(models.Model):
    following = models.ForeignKey(User, on_delete=models.CASCADE,null=True, related_name='stream_following')
    user = models.ForeignKey(User, on_delete=models.CASCADE)   
    post = models.ForeignKey(Post, on_delete=models.CASCADE, null=True)
    date = models.DateTimeField()

    def add_post(sender, instance, *args, **kwargs):
          post = instance
          user = post.user
          followers = Follow.objects.all().filter(following=user)
          for follower in followers:
              stream = Stream(post=post, user=follower.follower, date=post.posted, following=user)
              stream.save()


class Likes(models.Model):
	user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='user_like')
	post = models.ForeignKey(Post, on_delete=models.CASCADE, related_name='post_like')
	def user_liked_post(sender, instance, *args, **kwargs):
		like = instance
		post = like.post
		sender = like.user
		notify = Notification(post=post, sender=sender, user=post.user, notification_type=1)
		notify.save()

	def user_unlike_post(sender, instance, *args, **kwargs):
		like = instance
		post = like.post
		sender = like.user

		notify = Notification.objects.filter(post=post, sender=sender, notification_type=1)
		notify.delete()






post_save.connect(Stream.add_post, sender=Post)
          
    	 
    	 
    	


# Create your models here.

class Notification(models.Model):
	NOTIFICATION_TYPES = ((1,'Like'),(2,'Comment'), (3,'Follow'))

	post = models.ForeignKey('post.Post', on_delete=models.CASCADE, related_name="noti_post", blank=True, null=True)
	sender = models.ForeignKey(User, on_delete=models.CASCADE, related_name="noti_from_user")
	user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="noti_to_user")
	notification_type = models.IntegerField(choices=NOTIFICATION_TYPES)
	text_preview = models.CharField(max_length=90, blank=True)
	date = models.DateTimeField(auto_now_add=True)
	is_seen = models.BooleanField(default=False)
      


post_save.connect(Stream.add_post, sender=Post)

#Likes
post_save.connect(Likes.user_liked_post, sender=Likes)
post_delete.connect(Likes.user_unlike_post, sender=Likes)

#Follow
post_save.connect(Follow.user_follow, sender=Follow)
post_delete.connect(Follow.user_unfollow, sender=Follow)