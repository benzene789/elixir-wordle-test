import './App.css'
import '../src/components/Grid.tsx'
import Grid from '../src/components/Grid.tsx'

function App() {

  return (
    <div className="container flex justify-center items-center mx-auto mt-[10vh]">
      <Grid guesses={[]} feedback={[]} />
    </div>
  )
}

export default App
