
from django.contrib import admin
from django.urls import path,include
from instagramapp import views
from django.conf.urls.static import static 
from django.conf import settings 

urlpatterns = [

path('',views.index,name="home"),
path('profile/',views.UserProfile,name="pro")
   
]
