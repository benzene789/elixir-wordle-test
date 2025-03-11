from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import status
from wordle_api.models import Word
from wordle_api.serializers import WordSerializer
import random


class RandomWordView(APIView):
    def get(self, request):
        words = Word.objects.all()
        if not words.exists():
            return Response(
                {"error": "No words found in the database."},
                status=status.HTTP_404_NOT_FOUND
            )
        random_word = random.choice(words)
        serializer = WordSerializer(random_word)
        return Response(serializer.data)


class ValidateGuessView(APIView):
    def post(self, request):
        guess = request.data.get("guess", "").lower()
        correct_word = request.data.get("correct_word", "").lower()
        if len(guess) != 5:
            return Response(
                {"error": "Guess must be 5 characters long."},
                status=status.HTTP_400_BAD_REQUEST
            )
        if not guess.isalpha():
            return Response(
                {"error": "Guess must contain only alphabetic characters."},
                status=status.HTTP_400_BAD_REQUEST
            )
        if correct_word == "":
            return Response(
                {"error": "Missing correct_word"},
                status=status.HTTP_400_BAD_REQUEST
            )

        # Check if the guess exists in the database
        if not Word.objects.filter(word=guess).exists():
            return Response(
                {"error": "Guess is not in our word list."},
                status=status.HTTP_400_BAD_REQUEST,
            )

        feedback = []

        for i in range(5):
            if guess[i] == correct_word[i]:
                feedback.append("green")
            elif guess[i] in correct_word:
                feedback.append("yellow")
            else:
                feedback.append("gray")

        return Response({"feedback": feedback})
