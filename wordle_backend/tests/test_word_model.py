import pytest
from wordle_api.models import Word


@pytest.fixture
def created_word():
    word = Word.objects.create(word="apple")
    yield word
    word.delete()


@pytest.mark.django_db
def test_word_creation(created_word):
    assert created_word.word == "apple"
