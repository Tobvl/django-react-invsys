from django.shortcuts import render
from django.contrib.auth.models import User
from rest_framework import generics
from .serializers import UserSerializer
from rest_framework.permissions import IsAuthenticated, AllowAny

# Create your views here.

# Vista para crear un nuevo usuario (Formulario de registro)
class CreateUserView(generics.CreateAPIView):
    queryset = User.objects.all() # Estos son todos los objetos a los que vamos a mirar al momento de crear un nuevo usuario
    serializer_class = UserSerializer# Le dice a esta vista que tipo de datos debemos aceptar al crear un usuario (user y pw)
    permission_classes = [AllowAny] # Quien puede acceder a esta vista (AllowAny -> Cualquiera puede acceder)