from django.shortcuts import render
from account.serializers import UserDetailSerializer, UserFullDetailsSerializer, UserSerializer
from django.http import Http404
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework import generics
from account.models import UserDetail
from django.contrib.auth.models import User

class UserDetailLC(generics.ListCreateAPIView):
    queryset = UserDetail.objects.all()
    serializer_class = UserDetailSerializer

class UserDetailRUD(generics.RetrieveUpdateDestroyAPIView):
    queryset = UserDetail.objects.all()
    serializer_class = UserDetailSerializer

class AllUsers(generics.ListCreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer

        