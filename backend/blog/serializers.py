from rest_framework.serializers import ModelSerializer
from .models import User, Post, Comment

class UserSerializer(ModelSerializer):
    class Meta:
        model = User
        fields = ['id','username','email']
class PostSerializer(ModelSerializer):
    class Meta:
        model = Post
        fields = ['id','user','description','createdAt']
    
class CommentSerializer(ModelSerializer):
    class Meta:
        model = Comment
        fields = '__all__'