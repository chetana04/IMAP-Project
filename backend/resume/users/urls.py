from django.urls import path, include
from .views import *
from . import views


urlpatterns = [
    path('register/', registerAPIView.as_view()),
    path('login/', LoginAPIView.as_view()),
    path('user/', UserView.as_view()),
    path('logout/', LogoutView.as_view()),
    path('update/', UpdateUserAPIView.as_view(), name='update_user'),
]
