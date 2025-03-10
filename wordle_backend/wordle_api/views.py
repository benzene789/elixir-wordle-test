from rest_framework.response import Response
from rest_framework.views import APIView
from wordle_api.models import Word
from wordle_api.serializers import WordSerializer
import random


class RandomWordView(APIView):
    def get(self, request):
        words = Word.objects.all()
        random_word = random.choice(words)
        serializer = WordSerializer(random_word)
        return Response(serializer.data)


class ValidateGuessView(APIView):
    def post(self, request):
        guess = request.data.get("guess", "").lower()
        correct_word = request.data.get("correct_word", "").lower()
        feedback = []

        for i in range(5):
            if guess[i] == correct_word[i]:
                feedback.append("green")
            elif guess[i] in correct_word:
                feedback.append("yellow")
            else:
                feedback.append("gray")

        return Response({"feedback": feedback})
