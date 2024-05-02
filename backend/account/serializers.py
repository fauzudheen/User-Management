from rest_framework import serializers
from account.models import MyUser

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = MyUser
        fields = ['id', 'username', 'email', 'password', 'first_name', 'last_name', 'profile', 'date_joined']

        
