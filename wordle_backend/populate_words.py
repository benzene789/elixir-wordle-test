import os
import django

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "wordle_backend.settings")
django.setup()

from wordle_api.models import Word

words = ["apple", "brave", "crane", "dwarf", "elite", "fairy", "grape", "honey", "igloo", "jolly"]

for word in words:
    Word.objects.create(word=word)

print("Words added to the database.")
