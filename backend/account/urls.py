from django.urls import path
from . import views
from .views import UserListCreateView, UserRetrieveUpdateDestroyView, UserSignupView, UserLoginView, AdminLoginView

urlpatterns = [
    path('users/', UserListCreateView.as_view(), name='user-detail-list-create'),
    path('users/<int:pk>/', UserRetrieveUpdateDestroyView.as_view(), name='user-detail-retrieve-update-destroy'),
    path('signup/', UserSignupView.as_view(), name='user_signup'),
    path('login/', UserLoginView.as_view(), name='user_login'),
    path('admin-login/', AdminLoginView.as_view(), name='user_login'),
]