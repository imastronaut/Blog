from rest_framework.serializers import ModelSerializer
from .models import User, Post

class UserSerializer(ModelSerializer):
    class Meta:
        model = User
        fields = ['username','email']
class PostSerializer(ModelSerializer):
    class Meta:
        model = Post
        fields = ['id','user','description','createdAt']
    