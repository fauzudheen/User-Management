from django.urls import path
from . import views
from .views import UserDetailLC, UserDetailRUD, AllUsers

urlpatterns = [
    path('user-details/', UserDetailLC.as_view(), name='user-detail-list-create'),
    path('user-details/<int:pk>/', UserDetailRUD.as_view(), name='user-detail-retrieve-update-destroy'),
    path('users/', AllUsers.as_view(), name='all_users'),
]