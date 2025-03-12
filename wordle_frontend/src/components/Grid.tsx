import React, { JSX, useEffect, useState } from "react";
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
const Grid: React.FC = (): JSX.Element => {
  const { guesses, feedback, currentGuess, feedbackMessage } = useGameContext();
  const [animateCell, setAnimateCell] = useState<{ row: number; col: number } | null>(null);
  const [animateRow, setAnimateRow] = useState<number | null>(null);
  const [completedCells, setCompletedCells] = useState<boolean[][]>(
    Array.from({ length: 6 }, () => Array.from({ length: 5 }, () => false))
  );

  // Trigger pulse animation when a new letter is typed
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

  // Trigger the shake animation when feedbackMessage changes
  useEffect(() => {
    if (feedbackMessage) {
      const row = guesses.length;
      setAnimateRow(row);
      const timeout = setTimeout(() => setAnimateRow(null), 200); // Match animation duration
      return () => clearTimeout(timeout);
    }
  }, [feedbackMessage, guesses.length]);

  // Trigger the animation when feedback changes
  useEffect(() => {
    if (feedback.length > 0) {
      const currentRow = feedback.length - 1;

      // Reset completed cells for the current row
      setCompletedCells((prev) => {
        const newCompleted = [...prev];
        newCompleted[currentRow] = Array.from({ length: 5 }, () => false);
        return newCompleted;
      });

      // Mark cells as completed after the animation duration
      feedback[currentRow].forEach((_, colIndex) => {
        setTimeout(() => {
          setCompletedCells((prev) => {
            const newCompleted = [...prev];
            newCompleted[currentRow][colIndex] = true;
            return newCompleted;
          });
        }, colIndex * 500 + 350); // Fine tuned duration (want to show colour just after the flip)
      });
    }
  }, [feedback]);

  // Get the background color for a cell based on its feedback
  const getCellColour = (colour: string): string => {
    switch (colour) {
      case "green":
        return "bg-green-500 text-white";
      case "yellow":
        return "bg-yellow-500 text-white";
      case "gray":
        return "bg-gray-500 text-white";
      default:
        return "bg-[#242424] text-white";
    }
  }

  // Add flip animation to each cell
  const animateGuess = (colour: string) => {
    const feedbackColours = ["green", "yellow", "gray"];
    
    // We know feedback has happened if colour of cell is in feedbackColours
    if (feedbackColours.includes(colour)) {
      return `motion-safe:animate-flip`;
    }
    return "";
  };

  return (
    <div className="flex flex-col gap-2">
      {Array.from({ length: 6 }).map((_, rowIndex) => {
        const isActiveRow = rowIndex === guesses.length;
        const rowLetters = isActiveRow
          ? currentGuess.padEnd(5, " ")
          : guesses[rowIndex] || "";

        return (
          <div key={rowIndex} className={`flex gap-2 ${animateRow === rowIndex ? "motion-safe:animate-shake" : ""}`}>
            {Array.from({ length: 5 }).map((_, colIndex) => {
              const letter = rowLetters[colIndex] || "";
              const colour = feedback[rowIndex]?.[colIndex];
              const isAnimated = animateCell?.row === rowIndex && animateCell?.col === colIndex;
              const isCompleted = completedCells[rowIndex]?.[colIndex];

              return (
                <div
                  key={colIndex}
                  className={`w-24 h-24 flex items-center justify-center text-2xl font-bold border-2 border-gray-500
                    ${isCompleted ? getCellColour(colour) : "bg-[#242424]"}
                    ${animateGuess(colour)} ${isAnimated ? "motion-safe:animate-pulse" : ""}`
                  }
                  style={{ animationDelay: `${colIndex * 500}ms` }} // 500 ms delay between each letter
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