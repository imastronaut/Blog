from django.urls import path

#Define the Url patterns
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)

from .views import MyTokenObtainPairView
from . import views

urlpatterns = [

    path('token/', MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path("register/", views.register, name="register"),
    path("",views.getPosts,name="posts"),
    path("post/", views.createPost, name="createPost"),
    path("post/<str:pk>", views.post, name="post"),
    path("comment/<str:pk>",views.comment, name="comment"),
    path("user/<str:pk>", views.getProfile, name="profile"),
    path("like/<str:pk>", views.like, name="like")

]

