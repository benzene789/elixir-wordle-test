// src/components/Grid.tsx
import React from "react";

interface GridProps {
  guesses: string[];
  feedback: string[][];
}

const Grid: React.FC<GridProps> = ({ guesses, feedback }) => {
  return (
    <div className="flex flex-col gap-2">
      {Array.from({ length: 6 }).map((_, rowIndex) => (
        <div key={rowIndex} className="flex gap-2">
          {Array.from({ length: 5 }).map((_, colIndex) => {
            const guess = guesses[rowIndex] || "";
            const letter = guess[colIndex] || "";
            const color = feedback[rowIndex]?.[colIndex] || "gray";
            return (
              <div
                key={colIndex}
                className={`w-24 h-24 flex items-center justify-center text-2xl font-bold border-2 border-gray-500 ${
                  color === "green"
                    ? "bg-green-500 text-white"
                    : color === "yellow"
                    ? "bg-yellow-500 text-white"
                    : "bg-[#242424] text-white"
                }`}
              >
                {letter}
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
};

export default Grid;