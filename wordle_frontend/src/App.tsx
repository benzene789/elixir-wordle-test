import { JSX } from "react";
import "./App.css";
import Grid from "./components/Grid";
import Keyboard from "./components/Keyboard";
import useGame from "./hooks/useGame";

/**
 * The main App component for the Wordle clone.
 *
 * @returns {JSX.Element} The rendered application.
 */
const App = (): JSX.Element => {
  
  const {
    chosenWord,
    guesses,
    feedback,
    isGameOver,
    handleKeyPress,
  } = useGame();

  return (
    <div className="container flex flex-col justify-center items-center mx-auto mt-[10vh]">
      <h1 className="text-4xl font-bold mb-8">Wordle Clone</h1>
      <Grid guesses={guesses} feedback={feedback} />
      <Keyboard onKeyPress={handleKeyPress} />
      {isGameOver && (
        <div className="mt-4 text-xl font-bold">
          {guesses[guesses.length - 1] === chosenWord.toUpperCase()
            ? "You win! 🎉"
            : `Game over! The word was: ${chosenWord}`}
        </div>
      )}
    </div>
  );
};

export default App;