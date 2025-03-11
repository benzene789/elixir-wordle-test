import "./App.css";
import Grid from "./components/Grid";
import Keyboard from "./components/Keyboard";
import { useGameContext } from "./context/GameContext";

const App = () => {
  const { chosenWord, isGameOver } = useGameContext();

  return (
    <div className="container flex flex-col justify-center items-center mx-auto mt-[10vh]">
      <h1 className="text-4xl font-bold mb-8">Wordle Clone</h1>
      <Grid />
      <Keyboard />
      {isGameOver && (
        <div className="mt-4 text-xl font-bold">
          {chosenWord
            ? "You win! 🎉"
            : `Game over! The word was: ${chosenWord}`}
        </div>
      )}
    </div>
  );
};

export default App;