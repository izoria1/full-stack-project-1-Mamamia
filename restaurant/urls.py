#define URL route for index() view
from django.urls import path
from . import views
from .views import MenuItemView, SingleMenuItemView, CustomTokenCreateView
from rest_framework.authtoken.views import obtain_auth_token


urlpatterns = [
    path('', views.index, name='index'),
    path('menu/', MenuItemView.as_view(), name='menu-list'),
    path('menu/<int:pk>/', SingleMenuItemView.as_view(), name='menu-detail'),
    path('api-token-auth/', obtain_auth_token),
    path('auth/token/login/', CustomTokenCreateView.as_view(), name='token-login'),
]