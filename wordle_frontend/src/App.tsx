import "./App.css";
import Grid from "./components/Grid";
import Keyboard from "./components/Keyboard";
import { useGameContext } from "./context/GameContext";

const App = () => {
  const {
    chosenWord, isGameOver, guesses,
    feedbackMessage, setResetGame,
    setFeedback, setCurrentGuess, setGuesses
  } = useGameContext();

  // Reset the game
  const resetGame = () => {
    setResetGame((prevResetGame) => !prevResetGame);
    setFeedback([]);
    setCurrentGuess("");
    setGuesses([]);
  };

  return (
    <div className="container flex flex-col justify-center items-center mx-auto mt-[10vh]">
      <h1 className="text-4xl font-bold mb-8">Wordle Clone</h1>
      {feedbackMessage && <div className="text-red-500 mb-4">{feedbackMessage}</div>}
      <Grid />
      <Keyboard />
      {isGameOver && (
        <div className="text-center flex flex-col">
          <div className="mt-4 text-xl font-bold">
            {guesses[guesses.length - 1] === chosenWord.toUpperCase()
              ? "You win! 🎉"
              : `Game over! The word was: ${chosenWord}`}
          </div>
          <button
            className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            onClick={resetGame}
          >
            Play Again
          </button>
        </div>
      )}
    </div>
  );
};

export default App;