from django.urls import path
from authy.views import UserProfile, Signup, PasswordChange, PasswordChangeDone, EditProfile

from django.contrib.auth import views as authViews 
from authy import views


urlpatterns = [

   	path('', authViews.LoginView.as_view(template_name='login.html'), name='login'),



]