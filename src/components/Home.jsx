import React from 'react';

export default function Home({ setAppState }) {
	function handleGameStart() {
		setAppState("gamePlay");
	}

	return (
		<div className="text-container">
			<h1 className="game-title">Quizzical</h1>
			<p className="game-subtitle">Answer some random questions and have fun!</p>
			<button className="main-btn start-game-btn" onClick={handleGameStart}>Start quiz</button>
		</div>
	);
}
