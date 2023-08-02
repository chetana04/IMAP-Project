from django.shortcuts import render

from rest_framework.views import APIView
from rest_framework.response import Response
from .serializers import UserSerializer
from .models import User
from rest_framework.exceptions import AuthenticationFailed

import jwt
import datetime
from rest_framework import status


class registerAPIView(APIView):
    def post(self, request):
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class LoginAPIView(APIView):
    def post(self, request):
        email = request.data.get('email')
        password = request.data.get('password')

        if not email or not password:
            raise AuthenticationFailed(
                'Please provide both email and password.')

        user = User.objects.filter(email=email).first()

        if not user:
            raise AuthenticationFailed('User not found.')

        if not user.check_password(password):
            raise AuthenticationFailed('Invalid password.')

        payload = {
            "id": user.id,
            "email": user.email,
            "exp": datetime.datetime.utcnow() + datetime.timedelta(minutes=60),
            "iat": datetime.datetime.utcnow()
        }

        token = jwt.encode(payload, 'secret', algorithm='HS256')

        response = Response({'jwt token': token})
        # httonly - frontend can't access cookie, only for backend
        response.set_cookie(key='jwt', value=token, httponly=True)
        return response


class UserView(APIView):
    def get(self, request):
        token = request.COOKIES.get('jwt')

        if not token:
            raise AuthenticationFailed(
                "Unauthenticated.", status.HTTP_401_UNAUTHORIZED)

        try:
            payload = jwt.decode(token, 'secret', algorithms="HS256")

        except jwt.ExpiredSignatureError:
            raise AuthenticationFailed(
                "Unauthenticated.", status.HTTP_401_UNAUTHORIZED)

        user = User.objects.filter(id=payload['id']).first()
        serializer = UserSerializer(user)
        return Response(serializer.data)


class UpdateUserAPIView(APIView):
    def put(self, request):
        token = request.COOKIES.get('jwt')

        if not token:
            raise AuthenticationFailed(
                "Unauthenticated.", status.HTTP_401_UNAUTHORIZED)

        try:
            payload = jwt.decode(token, 'secret', algorithms="HS256")

        except jwt.ExpiredSignatureError:
            raise AuthenticationFailed(
                "Unauthenticated.", status.HTTP_401_UNAUTHORIZED)

        user = User.objects.filter(id=payload['id']).first()

        serializer = UserSerializer(user, data=request.data, partial=True)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data, status.HTTP_200_OK)


class LogoutView(APIView):
    def post(self, request):
        response = Response({'message': 'Logout successful'})
        response.delete_cookie('jwt')
        return response
