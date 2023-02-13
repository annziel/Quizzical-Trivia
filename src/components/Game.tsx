import React, { useState, useEffect } from 'react';
import Questions from "./Questions";
import { getNewQuestions } from "../getNewQuestions"
import type { Question } from "../getNewQuestions"


export default function Game({ appState, setAppState }) {
	// State for questions used in game, correct and chosen answers included;
	// passed to the Question Component to render and follow changes
    const [questions, setQuestions] = useState<Question[]>([]);

	// gain and display new questions when game starts
	useEffect(() => {
		setNewGame();
	}, []);

	async function setNewGame() {
		try {
			setAppState("loading")
			// API request and changes of the data to needed format
			const newQuestions:Question[] = await getNewQuestions()
			setQuestions(newQuestions);
			setAppState("quiz")
		} catch (err) {
			setAppState("error")
		}
	}

	// score is displayed in the game summary
	function calculateScore() {
		return questions.reduce( (score, q) => score + (
			q.correct_answer === q.selected_answer ? 1 : 0
		), 0 )
	}

	// Game return statements
	if(appState === "error") {
		return (
			<div className="error-message"> An error ocured. Please try again later.</div>
		)
	}
	return (
		<div className="text-container">
			<Questions
				appState={appState}
				questions={questions}
				setQuestions={setQuestions}
			/>
			
			<div className="game-summary">
				{appState === "results" && (
					<p className="game-summary-txt">
						You scored {' '} {calculateScore()}/5 correct answers
					</p>
				)}
				<button
					onClick={ appState === "results" ? setNewGame : () => setAppState("results") }
					className="main-btn game-summary-btn"
					disabled={ appState === "loading" ? true : false }
				>
					{appState === "results" ? "Play again" : "Check answers"}
				</button>
			</div>
		</div>
	);
}
