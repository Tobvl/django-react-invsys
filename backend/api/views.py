from django.shortcuts import render
from django.contrib.auth.models import User
from rest_framework import generics
from .serializers import UserSerializer, NoteSerializer
from rest_framework.permissions import IsAuthenticated, AllowAny
from .models import Note


# Create your views here.

class NoteListCreate(generics.ListCreateAPIView): # Vista para listar y crear notas
    serializer_class = NoteSerializer
    permission_classes = [IsAuthenticated] # Solo los usuarios autenticados pueden acceder a esta vista con un JWT Token válido

    def get_queryset(self):
        user = self.request.user # Obtener el usuario actualmente autenticado (user object)
        return Note.objects.filter(author=user) # Retornamos todas las notas que pertenecen al usuario actualmente autenticado
        # /\ /\ Se puede filtrar por cualquier campo del modelo, no solo por el autor (title="Nota 1")

    def perform_create(self, serializer):
        if serializer.is_valid(): # Si el serializador es válido (si todo corresponde al modelo de datos del serializador)
            serializer.save(author=self.request.user) # Guardamos la nota y le asignamos el usuario actualmente autenticado
        else:
            print(serializer.errors)

class NoteDelete(generics.DestroyAPIView):
    # queryset = Note.objects.all()
    serializer_class = NoteSerializer
    perimssion_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        return Note.objects.filter(author=user)
    

# Vista para crear un nuevo usuario (Formulario de registro)
class CreateUserView(generics.CreateAPIView):
    queryset = User.objects.all() # Estos son todos los objetos a los que vamos a mirar al momento de crear un nuevo usuario
    serializer_class = UserSerializer# Le dice a esta vista que tipo de datos debemos aceptar al crear un usuario (user y pw)
    permission_classes = [AllowAny] # Quien puede acceder a esta vista (AllowAny -> Cualquiera puede acceder)