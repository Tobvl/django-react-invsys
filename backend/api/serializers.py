from django.contrib.auth.models import User
from rest_framework import serializers
from .models import Note

# Serializador para el modelo User
# ORM -> Object Relational Mapping

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User # Representará el user
        fields = ['id', 'username', 'password'] # Campos que aceptaremos al crear un nuevo usuario
        extra_kwargs = {"password": {"write_only": True}} # Le dice a django que nadie puede leer el password

    
    # Método para crear un nuevo usuario
    def create(self, validated_data):
        user = User.objects.create_user(**validated_data)
        return user
    

class NoteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Note
        fields = ['id', 'title', 'content', 'created_at', 'author']
        extra_kwargs = {"author": {"read_only": True}} # Podemos ver el autor, pero no modificarlo