from django.shortcuts import render
from account.serializers import UserSerializer
from django.http import Http404
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework import generics
from account.models import MyUser
from django.contrib.auth.models import User
from rest_framework.parsers import MultiPartParser


class UserListCreateView(generics.ListCreateAPIView):
    queryset = MyUser.objects.all()
    serializer_class = UserSerializer

class UserRetrieveUpdateDestroyView(generics.RetrieveUpdateDestroyAPIView):
    queryset = MyUser.objects.all()
    serializer_class = UserSerializer


        