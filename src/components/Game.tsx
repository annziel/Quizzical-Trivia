import React, { useState, useEffect } from 'react';
import Questions from "./Questions";
import GameSummary from "./GameSummary";
import { getNewQuestions } from "../getNewQuestions"
import type { Question } from "../getNewQuestions"


export default function Game({ appState, setAppState }) {
	// State for questions used in game, correct and chosen answers included;
	// passed to the Question Component to render and follow changes
    const [questions, setQuestions] = useState<Question[]>([]);

	// gain and display new questions when game starts
	useEffect(() => {
		displayNewQuestions();
	}, []);

	async function displayNewQuestions() {
		try {
			setAppState("loading")
			// API request and changes data to needed format
			const newQuestions:Question[] = await getNewQuestions()
			setQuestions(newQuestions);
			setAppState("gamePlay")
		} catch (err) {
			setAppState("error")
		}
	}

	function handleGameEnd() {
		if (appState === "gameEnd") {
			// gain and render questions for a new game
			displayNewQuestions()
		} else if (appState === "gamePlay") {
			// stop the game to check the answers
			setAppState("gameEnd")
		}
	}

	// Score renderded in the Game Summary Component, but
	// data about correct and chosen answers are stored in State here (the Game Component), so
	// calculated Score is passed to the Game Summary as a prop
	function calculateScore() {
		const checkedAnswers:number[] = questions.map(q => {
			if (q.correct_answer === q.selected_answer) {
				return 1
			}
			return 0
		})
		return checkedAnswers.reduce( (score, ckeckedAnswer) => score + ckeckedAnswer, 0 )
	}

	return (
		<div className="text-container">
			{ appState === "error" ?
				<div className="error-message"> An error ocured. Please try again later.</div>
				:
				<div>
					<Questions
						appState={appState}
						questions={questions}
						setQuestions={setQuestions}
					/>
					<GameSummary
						appState={appState}
						handleGameEnd={handleGameEnd}
						score={calculateScore()}
					/>
				</div>
			}
		</div>
	);
}
