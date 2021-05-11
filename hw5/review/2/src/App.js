import { useState } from 'react'
import './App.css'
import { guess, startGame, restart } from './axios'

function App() {
  const [hasStarted, setHasStarted] = useState(false)
  const [hasWon, setHasWon] = useState(false)
  const [number, setNumber] = useState('')
  const [status, setStatus] = useState("Please enter a number")

  const startMenu = (
    <div>
      <h3 id="game-title">Guess Number Game</h3>
      <button
        className="btn btn-secondary"
        onClick={async () => {
          const msg = await startGame()
          if (msg === "The game has started.")
            setHasStarted(true)
        }}
      >
        start game
      </button>
    </div>
  )

  const winningMode = (
    <>
      <h4 id="finish-title">You won! The number was {number}.</h4>
      <button
        className="btn btn-secondary"
        onClick={async () => {
          const msg = await restart()
          if (msg === 'The game has restarted.') {
            setHasWon(false)
            setStatus("Please enter a number")
            setNumber('')
          }
        }}
      >
        restart
      </button>
    </>
  )

  // 1. use async/await to call guess(number) in Axios
  // 2. Process the response from server to set the proper state values
  const handleGuess = async () => {
    const msg = await guess(number);

    if (msg === undefined)
      setStatus("Please enter a number")
    else if (msg === status)
      setStatus(msg + " again")
    else
      setStatus(msg);

    if (msg === "Equal")
      setHasWon(true);
  }

  const gameMode = (
    <>
      <h4>Guess a number between 1 to 100</h4>
      <div className="input-group mb-3">
        <input
          value={number}
          onChange={(e) => setNumber(e.target.value)}
          type="text"
          className="form-control"
        />
        <div className="input-group-append">
          <button
            className="btn btn-outline-secondary"
            type="button"
            id="button-addon2"
            onClick={handleGuess}
            disabled={!number}
          >
            guess!
          </button>
        </div>
      </div>
      <h5>{status}</h5>
    </>
  )

  const game = (
    <div>
      {hasWon ? winningMode : gameMode}
    </div>
  )

  return <div className="App">{hasStarted ? game : startMenu}</div>
}

export default App
