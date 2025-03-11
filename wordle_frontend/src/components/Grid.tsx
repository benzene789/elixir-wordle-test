import React, { useEffect, useState } from "react";
import { useGameContext } from "../context/GameContext";

/**
 * A grid component that displays the user's guesses and feedback.
 * The grid consists of 6 rows, each containing 5 cells.
 * Each cell displays a letter from the user's guess and is colored based on the feedback:
 * - Green: Correct letter in the correct position.
 * - Yellow: Correct letter in the wrong position.
 * - Gray: Incorrect letter.
 * - Default: No feedback yet (dark background).
 *
 * @returns {JSX.Element} The rendered grid component.
 */
const Grid: React.FC = () => {
  const { guesses, feedback, currentGuess } = useGameContext();
  const [animateCell, setAnimateCell] = useState<{ row: number; col: number } | null>(null);

  // Trigger animation when a new letter is typed
  useEffect(() => {
    if (currentGuess.length > 0) {
      const row = guesses.length;
      const col = currentGuess.length - 1;
      setAnimateCell({ row, col });

      // Reset animation after a short delay
      const timeout = setTimeout(() => setAnimateCell(null), 200); // Match animation duration
      return () => clearTimeout(timeout);
    }
  }, [currentGuess, guesses.length]);

  return (
    <div className="flex flex-col gap-2">
      {Array.from({ length: 6 }).map((_, rowIndex) => {
        const isActiveRow = rowIndex === guesses.length;
        const rowLetters = isActiveRow
          ? currentGuess.padEnd(5, " ")
          : guesses[rowIndex] || "";

        return (
          <div key={rowIndex} className="flex gap-2">
            {Array.from({ length: 5 }).map((_, colIndex) => {
              const letter = rowLetters[colIndex] || "";
              const color = feedback[rowIndex]?.[colIndex];
              const isAnimated = animateCell?.row === rowIndex && animateCell?.col === colIndex;

              return (
                <div
                  key={colIndex}
                  className={`w-24 h-24 flex items-center justify-center text-2xl font-bold border-2 border-gray-500 ${
                    color === "green"
                      ? "bg-green-500 text-white"
                      : color === "yellow"
                      ? "bg-yellow-500 text-white"
                      : color === "gray"
                      ? "bg-gray-500 text-white"
                      : "bg-[#242424] text-white"
                  } ${isAnimated ? "animate-pulse" : ""}`}
                >
                  {letter}
                </div>
              );
            })}
          </div>
        );
      })}
    </div>
  );
};

export default Grid;