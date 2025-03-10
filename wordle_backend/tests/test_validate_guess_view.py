import pytest
from django.urls import reverse
from rest_framework.test import APIClient


@pytest.mark.django_db
def test_validate_guess_correct():
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
def test_validate_guess_partially_correct():
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
def test_validate_guess_incorrect():
    client = APIClient()

    # Test an incorrect guess
    url = reverse("validate_guess")
    data = {"guess": "clubs", "correct_word": "tried"}
    response = client.post(url, data, format="json")

    assert response.status_code == 200
    assert response.data["feedback"] == [
        "gray", "gray", "gray", "gray", "gray"
    ]
