from rest_framework import serializers
from account.models import MyUser
from django.contrib.auth import authenticate

class UserSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)

    class Meta:
        model = MyUser
        fields = ['id', 'username', 'email', 'password', 'first_name', 'last_name', 'profile', 'date_joined']

    def create(self, validated_data):
        user = MyUser.objects.create_user(**validated_data)
        return user


class UserLoginSerializer(serializers.Serializer):
    username = serializers.CharField()
    password = serializers.CharField()

    def validate(self, data):
        username = data.get('username', None)
        password = data.get('password', None)
        if username and password:
            user = authenticate(username=username, password=password)
            if user:
                if user.is_active:
                    data['user'] = user
                else:
                    msg = 'User account is disabled.'
                    raise serializers.ValidationError(msg)
            else:
                msg = 'Unable to login with given credentials.'
                raise serializers.ValidationError(msg)
        else:
            msg = 'Must provide both username and password.'
            raise serializers.ValidationError(msg)
        return data


class AdminLoginSerializer(serializers.Serializer):
    username = serializers.CharField()
    password = serializers.CharField(write_only=True)

    def validate(self, data):
        username = data.get('username')
        password = data.get('password')

        if username is None or password is None:
            raise serializers.ValidationError("Both username and password are required.")

        user = authenticate(username=username, password=password)
        if user is None:
            raise serializers.ValidationError("Invalid username or password.")

        if not user.check_password(data['password']):
            raise serializers.ValidationError("Invalid username or password.")

        if not user.is_superuser:
            raise serializers.ValidationError("User is not a superuser.")

        return user