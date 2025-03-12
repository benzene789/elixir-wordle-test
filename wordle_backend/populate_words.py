import os
import django


os.environ.setdefault("DJANGO_SETTINGS_MODULE", "wordle_backend.settings")

django.setup()

from wordle_api.models import Word

file_path = "wordlist.txt"

# Read words from the text file
with open(file_path, "r") as file:
    words = [line.strip() for line in file if line.strip()]  # Remove empty lines and whitespace

# Add words to the database
added_count = 0
for word in words:
    if not Word.objects.filter(word=word).exists():  # Check if the word already exists
        Word.objects.create(word=word)
        added_count += 1

print(f"{added_count} words added to the database.")