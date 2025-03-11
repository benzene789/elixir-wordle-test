import React from "react";
import { useGameContext } from "../context/GameContext";

/**
 * A keyboard component that allows the user to input guesses.
 * The keyboard is divided into three rows:
 * - Top row: Q W E R T Y U I O P
 * - Middle row: A S D F G H J K L
 * - Bottom row: Enter Z X C V B N M Backspace
 *
 * @returns {JSX.Element} The rendered keyboard component.
 */
const Keyboard: React.FC = () => {
  const { handleKeyPress  } = useGameContext();

  const topRow = ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"];
  const middleRow = ["A", "S", "D", "F", "G", "H", "J", "K", "L"];
  const bottomRow = ["Z", "X", "C", "V", "B", "N", "M"];

  return (
    <div className="flex flex-col gap-2 mt-4">
      {/* Top Row */}
      <div className="flex gap-2 justify-center">
        {topRow.map((key) => (
          <button
            key={key}
            onClick={() => handleKeyPress(key)}
            className="px-4 py-2 bg-gray-200 text-black font-bold rounded-lg hover:bg-gray-300 focus:outline-none"
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
            className="px-4 py-2 bg-gray-200 text-black font-bold rounded-lg hover:bg-gray-300 focus:outline-none"
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
            className="px-4 py-2 bg-gray-200 text-black font-bold rounded-lg hover:bg-gray-300 focus:outline-none"
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