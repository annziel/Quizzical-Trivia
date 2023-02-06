import React, { useState } from 'react';
import Home from "./Home";
import Game from "./Game";

function App() {
	// AppState is responsible for game flow and influence every app component,
	// posssible string values:
	// "home", "loading", "gamePlay", "gameEnd", "error"
	const [appState, setAppState] = useState("home");

	return (
		<main className={appState === "home" ? "home-view" : ""}>
			{ appState === "home" ?
				<Home setAppState={setAppState} /> :
				<Game appState={appState} setAppState={setAppState} />
			}
		</main>
	);
}

export default App;
