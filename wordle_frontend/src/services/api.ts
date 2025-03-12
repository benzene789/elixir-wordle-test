import axios from "axios";

const API_URL = "/api"; // Proxy to Django backend

// Fetch a random word
export const fetchRandomWord = async () => {
  const response = await axios.get(`${API_URL}/word/`);
  return response.data.word;
};

// Validate a user's guess
export const validateGuess = async (guess: string, correctWord: string) => {
  const response = await axios.post(`${API_URL}/validate/`, { guess, correct_word: correctWord });
  return response.data.feedback;
};