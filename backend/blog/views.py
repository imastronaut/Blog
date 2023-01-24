from django.shortcuts import render

# Create your views here.
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from .models import User, Post
from .serializers import UserSerializer,PostSerializer
from rest_framework import status


class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)

        # Add custom claims
        token['username'] = user.username
        token['email'] = user.email

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

@api_view(['DELETE','PUT'])
@permission_classes([IsAuthenticated])
def post(request,pk):
    if request.method == 'POST':
        post = Post.objects.get(pk=pk)
        post.delete()
        return Response("post Deleted")
    return Response("hello")


