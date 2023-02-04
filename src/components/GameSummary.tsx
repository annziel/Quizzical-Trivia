// TO DO:
// handleClick - other features
// game-summary-text - score rendering

import React from "react";

export default function GameSummary({
	isAnswersChecked, score, handleGameSummaryChange
}) {
	

	return (
		<div className="game-summary">
			{isAnswersChecked && (
				<p className="game-summary-txt">
					You scored
					{' '}
					{score}
					/5 correct answers
				</p>
			)}
			<button
				onClick={handleGameSummaryChange}
				className="main-btn game-summary-btn"
			>
				{isAnswersChecked ? "Play again" : "Check answers"}
			</button>
		</div>
	);
}
