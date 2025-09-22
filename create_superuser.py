import os
import django

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "professor_website.settings")
django.setup()

from django.contrib.auth.models import User

username = "udat4Bharath"
email = "example@gmail.com"
password = "Chinmayi@2020"

if not User.objects.filter(username=username).exists():
    User.objects.create_superuser(username, email, password)
    print("Superuser created ✅")
else:
    print("Superuser already exists 🚀")




