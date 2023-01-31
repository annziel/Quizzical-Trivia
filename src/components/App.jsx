import React, { useState } from 'react'
import Home from "./Home"
import Game from "./Game"

function App() {
  const [welcomeView, setWelcomeView] = useState(true)

  function handleChange() {
    setWelcomeView(prevView => !prevView)
  }

  return (
    <main className={welcomeView ? "welcome-view" : ""}>
      {welcomeView ? <Home handleViewChange={handleChange} /> : <Game />}
    </main>
  )
}

export default App
