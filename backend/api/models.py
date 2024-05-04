from django.db import models
from django.contrib.auth.models import User

# Create your models here.
class Note(models.Model):
    title = models.CharField(max_length=100)
    content = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True) # Se añadirá la fecha y hora actual al momento de crear la nota
    # Relación de uno a muchos (Un usuario puede tener muchas notas)
    author = models.ForeignKey(User, # Clave foránea para vincular la nota con el usuario que la creó
                               on_delete=models.CASCADE, #Si el usuario es eliminado, todas sus notas también lo serán
                               related_name="notes") # Nombre que se usará para acceder a las notas de un usuario (user.notes.all())
    
    def __str__(self):
        return self.title
