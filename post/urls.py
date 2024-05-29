
from django.contrib import admin
from django.urls import path,include
from post import views
from django.conf.urls.static import static 
from django.conf import settings 


urlpatterns = [

	path('', views.index, name='index'),
      
   	path('<noti_id>/delete', views.DeleteNotification, name='delete-notification'),
       	path('newpost', views.NewPost, name='newpost'),
        path('<uuid:post_id>', views.PostDetails, name='postdetails'),
        path('tag/<slug:tag_slug>', views.tags, name='tags'),
        path('<uuid:post_id>/like', views.like, name='postlike'),
        path('<uuid:post_id>/likes', views.likee, name='postlikes'),
        path('<uuid:post_id>/favorite', views.favorite, name='postfavorite'),
         path('<uuid:post_id>/favorites', views.favoritee, name='postfavorites'),
       
   
   
]
