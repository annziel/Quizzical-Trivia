import React, { useState } from 'react';
import Home from "./Home";
import Game from "./Game";

function App() {
	const [homeView, setHomeView] = useState(true);

	function handleChange() {
		setHomeView((prevView) => !prevView);
	}

	return (
		<main className={homeView ? "home-view" : ""}>
			{homeView ? <Home handleViewChange={handleChange} /> : <Game />}
		</main>
	);
}

export default App;
