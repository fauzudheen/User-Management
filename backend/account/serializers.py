from rest_framework import serializers
from account.models import UserDetail
from django.contrib.auth.models import User

class UserDetailSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserDetail
        fields = ['profile']

class UserFullDetailsSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserDetail
        fields = ['user', 'profile']
        depth = 1

class UserSerializer(serializers.ModelSerializer):
    user_detail = UserDetailSerializer()  

    class Meta:
        model = User
        fields = ['username', 'email', 'password', 'first_name', 'last_name', 'user_detail']
