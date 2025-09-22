import os
import django

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "blogApp.settings")
django.setup()

from django.contrib.auth.models import User

username = "your_username"
email = "example@gmail.com"
password = "your_password"

if not User.objects.filter(username=username).exists():
    User.objects.create_superuser(username, email, password)
    print("Superuser created ✅")
else:
    print("Superuser already exists 🚀")




