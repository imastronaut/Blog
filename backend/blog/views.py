from django.shortcuts import render

# Create your views here.
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from .models import User, Post, Comment
from .serializers import UserSerializer,PostSerializer,CommentSerializer
from rest_framework import status


class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)

        # Add custom claims
        token['username'] = user.username
        token['email'] = user.email
        token['id'] = user.id

        return token

class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer




#View to register user
@api_view(['POST'])
def register(request):
    data = request.data
    try:
        user = User.objects.create_user(username=data['username'],email=data['email'],password=data['password'])
        user.save()
    except:
        content = "These credentails already exists"
        return Response(content, status = status.HTTP_409_CONFLICT)
    serializer= UserSerializer(user,many=False)
    return Response(serializer.data)

#view to get posts
@api_view(['GET'])
def getPosts(request):
    posts = Post.objects.all()
    serializer = PostSerializer(posts,many=True)
    return Response(serializer.data)

#Creating a new post
@api_view(['POST'])
@permission_classes([IsAuthenticated])
def post(request):
    if request.method=="POST":
        user = request.user
        body = request.data['body']
        post = Post.objects.create(user=user,body=body)
        serializer = PostSerializer(post, many=False)
        return Response(serializer.data)





#view to deal with existing posts
@api_view(['GET','POST'])
@permission_classes([IsAuthenticated])
def comments(request,pk):
    if request.method == "GET":
        post = Post.objects.get(pk=pk)
        comments = Comment.objects.filter(post=post)
        serializer = CommentSerializer(comments, many=True)
        return Response(serializer.data)
    elif request.method == "POST":
        post = Post.objects.get(pk=pk)
        user = request.user
        body = request.data['comment']
        comment = Comment.objects.create(post=post,user=user,body=body)
        post.comments.add(user)
        serializer = CommentSerializer(comment, many=False)
        return Response(serializer.data)

        



@api_view(['GET'])
def getProfile(request,pk):
    profile = User.objects.get(pk=pk)
    serializer = UserSerializer(profile,many=False)
    return Response(serializer.data)

@api_view(['POST','DELETE'])
@permission_classes([IsAuthenticated])
def like(request,pk):
    if request.method=="POST":
        post= Post.objects.get(pk=pk)
        user=request.user
        post.likes.add(user)
        serializer = UserSerializer(user)
        return Response(serializer.data)
    elif request.method=="DELETE":
        post = Post.objects.get(pk=pk)
        user = request.user
        post.likes.remove(user)
        return Response("unliked")





