from django.urls import path
from wordle_api.views import RandomWordView, ValidateGuessView

urlpatterns = [
    path("word/", RandomWordView.as_view(), name="random_word"),
    path("validate/", ValidateGuessView.as_view(), name="validate_guess"),
]
