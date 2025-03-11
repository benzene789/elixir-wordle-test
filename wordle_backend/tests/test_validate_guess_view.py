import pytest
from django.urls import reverse
from rest_framework.test import APIClient
from wordle_api.models import Word


class TestValidateGuessView:
    @pytest.fixture(autouse=True)
    def setup(self):
        # Copy method in populate_words
        words = ["apple", "brave", "crane", "dwarf",
                 "elite", "fairy", "grape", "honey",
                 "igloo", "jolly"]

        for word in words:
            Word.objects.create(word=word)

        yield

        Word.objects.all().delete()

    @pytest.mark.django_db
    def test_validate_guess_correct(self):
        client = APIClient()

        # Test a correct guess
        url = reverse("validate_guess")
        data = {"guess": "apple", "correct_word": "apple"}
        response = client.post(url, data, format="json")

        assert response.status_code == 200
        assert response.data["feedback"] == [
            "green", "green", "green", "green", "green"
        ]

    @pytest.mark.django_db
    def test_validate_guess_partially_correct(self):
        client = APIClient()

        # Test a partially correct guess
        url = reverse("validate_guess")
        data = {"guess": "crane", "correct_word": "apple"}
        response = client.post(url, data, format="json")

        assert response.status_code == 200
        assert response.data["feedback"] == [
            "gray", "gray", "yellow", "gray", "green"
        ]

    @pytest.mark.django_db
    def test_validate_guess_incorrect(self):
        client = APIClient()

        # Test an incorrect guess
        url = reverse("validate_guess")
        data = {"guess": "honey", "correct_word": "dwarf"}
        response = client.post(url, data, format="json")

        assert response.status_code == 200
        assert response.data["feedback"] == [
            "gray", "gray", "gray", "gray", "gray"
        ]

    # Although planned to be validated on front end
    # these tests will make it more robust
    @pytest.mark.django_db
    def test_validate_guess_invalid_length(self):
        client = APIClient()

        # Test a guess with invalid length
        url = reverse("validate_guess")
        data = {"guess": "app", "correct_word": "apple"}
        response = client.post(url, data, format="json")

        assert response.status_code == 400
        assert response.data['error'] == 'Guess must be 5 characters long.'

    @pytest.mark.django_db
    def test_validate_guess_missing_data(self):
        client = APIClient()

        # Test a request with missing data
        url = reverse("validate_guess")
        data = {"guess": "apple"}  # Missing correct_word
        response = client.post(url, data, format="json")

        assert response.data['error'] == 'Missing correct_word'
        assert response.status_code == 400

    @pytest.mark.django_db
    def test_validate_guess_non_alphabetic(self):
        client = APIClient()

        # Test a guess with non-alphabetic characters
        url = reverse("validate_guess")
        data = {"guess": "app1e", "correct_word": "apple"}
        response = client.post(url, data, format="json")

        assert response.status_code == 400
        assert response.data['error'] == \
            'Guess must contain only alphabetic characters.'

    @pytest.mark.django_db
    def test_validate_guess_word_not_in_database(self):
        client = APIClient()

        # Test a guess with a word not in the database
        url = reverse("validate_guess")
        data = {"guess": "trial", "correct_word": "apple"}
        response = client.post(url, data, format="json")

        assert response.status_code == 400
        assert response.data['error'] == 'Guess is not in our word list.'
