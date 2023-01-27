from django.shortcuts import render

# Create your views here.
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from .models import User, Post
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





@api_view(['POST'])
def register(request):
    print(request.data)
    data = request.data
    try:
        user = User.objects.create_user(username=data['username'],email=data['email'],password=data['password'])
        user.save()
    except:
        content = "These credentails already exists"
        return Response(content, status = status.HTTP_409_CONFLICT)
    serializer= UserSerializer(user,many=False)
    return Response(serializer.data)

@api_view(['GET'])
def getPosts(request):
    posts = Post.objects.all()
    serializer = PostSerializer(posts,many=True)
    return Response(serializer.data)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def createPost(request):
    user = request.user
    description = request.data['description']
    post = user.posts.create(description=description)
    serializer = PostSerializer(post,many=False)
    return Response(serializer.data)

@api_view(['DELETE','PUT','GET'])
@permission_classes([IsAuthenticated])
def post(request,pk):
    if request.method == 'GET':
        post = Post.objects.get(pk=pk)
        comments = post.comments.all()
        serializer = CommentSerializer(comments,many=True)
        return Response(serializer.data)
    if request.method == 'DELETE':
        post = Post.objects.get(pk=pk)
        post.delete()

        return Response("post Deleted")
    return Response("hello")

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def comment(request,pk):
    user = request.user
    post = Post.objects.get(pk=pk)
    comment = post.comments.create(user=user, description=request.data['comment'])
    serializer = CommentSerializer(comment, many=False)
    serializer.data['user'] = UserSerializer(user,many=False)
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
        return Response("liked")
    else:
        post = Post.objects.get(pk=pk)
        user = request.user
        user1 = post.likes.remove(user)
        return Response("unliked")





