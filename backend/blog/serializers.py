from rest_framework.serializers import ModelSerializer
from .models import User, Post, Comment

class UserSerializer(ModelSerializer):
    class Meta:
        model = User
        fields = ['id','username','email']

    
class CommentSerializer(ModelSerializer):
    user = UserSerializer(many=False, read_only=True)
    class Meta:
        model = Comment
        fields = "__all__"

class PostSerializer(ModelSerializer):
    user = UserSerializer(many=False, read_only=True)
    likes = UserSerializer(many=True, read_only=True)
    comments = CommentSerializer(many=True,read_only=True)

    class Meta:
        model = Post
        fields = "__all__"


