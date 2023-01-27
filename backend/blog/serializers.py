from rest_framework.serializers import ModelSerializer
from .models import User, Post, Comment

class UserSerializer(ModelSerializer):
    class Meta:
        model = User
        fields = ['id','username','email']
class PostSerializer(ModelSerializer):
    likes = UserSerializer(many=True,read_only=True)
    user = UserSerializer(many=False,read_only=True)
    class Meta:
        model = Post
        fields = '__all__'
    
class CommentSerializer(ModelSerializer):
    user = UserSerializer(many=False, read_only=True)
    post = PostSerializer(many=False,read_only=True)
    class Meta:
        model = Comment
        fields = '__all__'