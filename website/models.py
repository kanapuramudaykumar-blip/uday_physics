from django.db import models

class Publication(models.Model):
    CATEGORY_CHOICES = [
        ('journals', 'Journals'),
        ('conference', 'Conference'),
        ('book_chapters', 'Book Chapters'),
        ('patents', 'Patents'),
    ]
    
    title = models.CharField(max_length=500)
    authors = models.TextField()
    journal = models.CharField(max_length=200, blank=True)
    volume = models.CharField(max_length=50, blank=True)
    page_no = models.CharField(max_length=50, blank=True)
    publication_date = models.DateField(help_text="Publication date (Day/Month/Year)")
    description = models.TextField(blank=True)
    url = models.URLField(blank=True)
    publication_link = models.URLField(blank=True, help_text="Direct link to the publication")
    category = models.CharField(max_length=20, choices=CATEGORY_CHOICES, default='journals')
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-publication_date', '-created_at']

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

class MyView(models.Model):
    title = models.CharField(max_length=200, default="Untitled View", help_text="Title of the view")
    description = models.CharField(max_length=500, help_text="Short description shown in the list")
    full_view = models.TextField(help_text="Complete view shown in the popup")
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-created_at']

    def __str__(self):
        return self.title