import React, { useState } from 'react';
import Home from "./Home";
import Game from "./Game.tsx";

function App() {
	const [appState, setAppState] = useState("home");

	return (
		<main className={appState === "home" ? "home-view" : ""}>
			{appState === "home" ? <Home setAppState={setAppState} /> : <Game appState={appState} setAppState={setAppState} />}
		</main>
	);
}

export default App;
