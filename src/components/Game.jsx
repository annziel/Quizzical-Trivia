import React, { useState } from 'react';
import Questions from "./Questions";
import GameSummary from "./GameSummary";

export default function Game() {
	const [answersChecked, setAnswersChecked] = useState(false);

	const [score, setScore] = useState(0);

	function getScore() {
		setScore(8);
	}

	function toggleAnswersChecking() {
		setAnswersChecked((prevState) => !prevState);
	}

	return (
		<div className="game text-container">
			<Questions
				isAnswersChecked={answersChecked}

			/>
			<GameSummary
				isAnswersChecked={answersChecked}
				setAnswers={toggleAnswersChecking}
				score={score}
				getScore={getScore}
			/>
		</div>
	);
}
