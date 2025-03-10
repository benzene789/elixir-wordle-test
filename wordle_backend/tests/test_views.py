import pytest
from django.urls import reverse
from rest_framework.test import APIClient
from wordle_api.models import Word


@pytest.fixture
def create_words():
    Word.objects.create(word="apple")
    Word.objects.create(word="brave")
    Word.objects.create(word="crane")

    yield

    Word.objects.all().delete()


@pytest.mark.django_db
def test_random_word_view(create_words):

    client = APIClient()

    # Make a GET request to the RandomWordView
    url = reverse("random_word")
    response = client.get(url)

    assert response.status_code == 200
    assert "word" in response.data
    # Assert that the word is in the list of valid words
    assert response.data["word"] in ["apple", "brave", "crane"]
