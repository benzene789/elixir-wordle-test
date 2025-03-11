import { useState, useEffect } from "react";
import { fetchRandomWord, validateGuess } from "../services/api";

/**
 * A custom hook to manage the game state.
 *
 * @returns {{
 *   chosenWord: string,
 *   guesses: string[],
 *   feedback: string[][],
 *   currentGuess: string,
 *   isGameOver: boolean,
 *   handleGuess: () => void,
 *   handleKeyPress: (key: string) => void
 * }} The game state and handlers.
 */
const useGame = (): {
    chosenWord: string;
    guesses: string[];
    feedback: string[][];
    currentGuess: string;
    isGameOver: boolean;
    handleGuess: () => void;
    handleKeyPress: (key: string) => void;
} => {
  const [chosenWord, setChosenWord] = useState<string>("");
  const [guesses, setGuesses] = useState<string[]>([]);
  const [feedback, setFeedback] = useState<string[][]>([]);
  const [currentGuess, setCurrentGuess] = useState<string>("");
  const [isGameOver, setIsGameOver] = useState<boolean>(false);


  // Fetch a random word when the game starts
  useEffect(() => {
    const initializeGame = async () => {
      const word = await fetchRandomWord();
      setChosenWord(word);
    };
    initializeGame();
  }, []);

  // Handle guess submission
  const handleGuess = async () => {
    if (currentGuess.length === 5) {
      const newFeedback = await validateGuess(currentGuess, chosenWord);
      setGuesses([...guesses, currentGuess]);
      setFeedback([...feedback, newFeedback]);
      setCurrentGuess("");

      // Check if the game is over
      if (newFeedback.every((color: string) => color === "green")) {
        setIsGameOver(true);
      } else if (guesses.length + 1 === 6) {
        setIsGameOver(true);
      }
    }
  };

  // Handle key press from the keyboard
  const handleKeyPress = (key: string) => {
    
    // Convert the key to uppercase
    key = key.toUpperCase();
  
    // Handle backspace
    if (key === "BACKSPACE") {
      setCurrentGuess((prev) => prev.slice(0, -1)); // Remove the last character
      return;
    }
  
    // Handle enter
    if (key === "ENTER") {
      handleGuess(); // Submit the guess
      return;
    }
  
    // Only allow alphabetic characters
    if (/^[A-Z]$/.test(key)) {
      if (currentGuess.length < 5 && !isGameOver) {
        setCurrentGuess((prev) => prev + key); // Add the character to the current guess
      }
    }
  };

  return {
    chosenWord,
    guesses,
    feedback,
    currentGuess,
    isGameOver,
    handleGuess,
    handleKeyPress,
  };
};

export default useGame;