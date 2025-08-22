from django.db import models

class Publication(models.Model):
    title = models.CharField(max_length=500)
    authors = models.TextField()
    journal = models.CharField(max_length=200)
    year = models.IntegerField()
    description = models.TextField(blank=True)
    url = models.URLField(blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-year', '-created_at']

    def __str__(self):
        return self.title

class ResearchProject(models.Model):
    title = models.CharField(max_length=300)
    description = models.TextField()
    role = models.CharField(max_length=100)
    sponsor = models.CharField(max_length=200)
    duration = models.CharField(max_length=100)
    cost = models.CharField(max_length=100)
    status = models.CharField(max_length=50)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.title

class ContactMessage(models.Model):
    name = models.CharField(max_length=100)
    email = models.EmailField()
    subject = models.CharField(max_length=200)
    message = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.name} - {self.subject}"