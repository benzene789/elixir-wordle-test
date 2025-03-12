#!/bin/sh

# Set the Django settings module
export DJANGO_SETTINGS_MODULE=wordle_backend.settings

# Run migrations
python manage.py migrate

# Populate the database with words
python populate_words.py

# Start the Django development server
exec python manage.py runserver 0.0.0.0:8000