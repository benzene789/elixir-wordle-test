import React from "react";

interface KeyboardProps {
  onKeyPress: (key: string) => void;
}

/**
 * A keyboard component that allows the user to input guesses.
 *
 * @param {KeyboardProps} props - The component props.
 * @param {(key: string) => void} props.onKeyPress - The function to call when a key is pressed.
 * @returns {JSX.Element} The rendered keyboard.
 */
const Keyboard: React.FC<KeyboardProps> = ({ onKeyPress }) => {
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
            onClick={() => onKeyPress(key)}
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
            onClick={() => onKeyPress(key)}
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
          onClick={() => onKeyPress("ENTER")}
          className="px-6 py-2 bg-blue-500 text-white font-bold rounded-lg hover:bg-blue-600 focus:outline-none"
        >
          Enter
        </button>

        {bottomRow.map((key) => (
          <button
            key={key}
            onClick={() => onKeyPress(key)}
            className="px-4 py-2 bg-gray-200 text-black font-bold rounded-lg hover:bg-gray-300 focus:outline-none"
          >
            {key}
          </button>
        ))}

        {/* Backspace Key */}
        <button
          onClick={() => onKeyPress("BACKSPACE")}
          className="px-6 py-2 bg-red-500 text-white font-bold rounded-lg hover:bg-red-600 focus:outline-none"
        >
          ⌫
        </button>
      </div>
    </div>
  );
};

export default Keyboard;