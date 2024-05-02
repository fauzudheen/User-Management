from django.urls import path
from . import views
from .views import UserListCreateView, UserRetrieveUpdateDestroyView

urlpatterns = [
    path('users/', UserListCreateView.as_view(), name='user-detail-list-create'),
    path('users/<int:pk>/', UserRetrieveUpdateDestroyView.as_view(), name='user-detail-retrieve-update-destroy'),
]