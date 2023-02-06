import React from "react";

export default function GameSummary({
	score, handleAppStateChange, appState
}) {
	
	return (
		<div className="game-summary">
			{appState === "gameEnd" && (
				<p className="game-summary-txt">
					You scored
					{' '}
					{score}
					/5 correct answers
				</p>
			)}
			<button
				onClick={handleAppStateChange}
				className="main-btn game-summary-btn"
				disabled={appState === "loading" ? true : false}
			>
				{appState === "gameEnd" ? "Play again" : "Check answers"}
			</button>
		</div>
	);
}
