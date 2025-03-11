import React, { JSX, useEffect } from "react";
import { useGameContext } from "../context/GameContext";

/**
 * A keyboard component that allows the user to input guesses.
 * with user feedback for each key.
 * The keyboard is divided into three rows:
 * - Top row: Q W E R T Y U I O P
 * - Middle row: A S D F G H J K L
 * - Bottom row: Enter Z X C V B N M Backspace
 *
 * @returns {JSX.Element} The rendered keyboard component.
 */
const Keyboard: React.FC = (): JSX.Element => {
  const { handleKeyPress, guesses, feedback } = useGameContext();

  const topRow = ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"];
  const middleRow = ["A", "S", "D", "F", "G", "H", "J", "K", "L"];
  const bottomRow = ["Z", "X", "C", "V", "B", "N", "M"];

  // Handle physical key presses
  useEffect(() => {
    const handlePhysicalKeyPress = (event: KeyboardEvent) => {
      const key = event.key.toUpperCase();

      // Only handle valid keys (letters, Enter, Backspace)
      if (/^[A-Z]$/.test(key) || key === "ENTER" || key === "BACKSPACE") {
        handleKeyPress(key);
      }
    };

    document.addEventListener("keydown", handlePhysicalKeyPress);
    return () => {
      document.removeEventListener("keydown", handlePhysicalKeyPress);
    };
  }, [handleKeyPress]);

  // Get the color of a key based on feedback
  const getKeyColor = (key: string): string => {
    let bestFeedback = "";

    // Loop through all guesses and their feedback
    for (let i = 0; i < guesses.length; i++) {
      const guess = guesses[i];
      const feedbackForGuess = feedback[i];

      // Find the index of the key in the guess
      const index = guess.indexOf(key);

      // If the key is in the guess, update the best feedback
      if (index !== -1) {
        const color = feedbackForGuess[index];
        if (color === "green") {
          bestFeedback = "green";
          break; // Green is the highest priority, so we can stop
        } else if (color === "yellow" && bestFeedback !== "green") {
          bestFeedback = "yellow";
        } else if (color === "gray" && bestFeedback !== "yellow") {
          bestFeedback = "gray";
        }
      }
    }

    // Return the corresponding background color
    if (bestFeedback === "green") {
      return "bg-green-500";
    } else if (bestFeedback === "yellow") {
      return "bg-yellow-500";
    } else if (bestFeedback === "gray") {
      return "bg-gray-500";
    }
    else {
      return "bg-gray-100";
    }
  };

  return (
    <div className="flex flex-col gap-2 mt-4">
      {/* Top Row */}
      <div className="flex gap-2 justify-center">
        {topRow.map((key) => (
          <button
            key={key}
            onClick={() => handleKeyPress(key)}
            className={`px-4 py-2 text-black font-bold rounded-lg focus:outline-none ${getKeyColor(key)}`}
          >
            {key}
          </button>
        ))}
      </div>

      {/* Middle Row */}
      <div className="flex gap-2 justify-center">
        {middleRow.map((key) => (
          <button
            key={key}
            onClick={() => handleKeyPress(key)}
            className={`px-4 py-2 text-black font-bold rounded-lg focus:outline-none ${getKeyColor(key)}`}
          >
            {key}
          </button>
        ))}
      </div>

      {/* Bottom Row */}
      <div className="flex gap-2 justify-center">
        {/* Enter Key */}
        <button
          onClick={() => handleKeyPress("ENTER")}
          className="px-6 py-2 bg-blue-500 text-white font-bold rounded-lg hover:bg-blue-600 focus:outline-none"
        >
          Enter
        </button>

        {bottomRow.map((key) => (
          <button
            key={key}
            onClick={() => handleKeyPress(key)}
            className={`px-4 py-2 text-black font-bold rounded-lg focus:outline-none ${getKeyColor(key)}`}
          >
            {key}
          </button>
        ))}

        {/* Backspace Key */}
        <button
          onClick={() => handleKeyPress("BACKSPACE")}
          className="px-6 py-2 bg-red-500 text-white font-bold rounded-lg hover:bg-red-600 focus:outline-none"
        >
          ⌫
        </button>
      </div>
    </div>
  );
};

export default Keyboard;