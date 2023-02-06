import React, { useState, useEffect } from 'react';
import Questions from "./Questions";
import GameSummary from "./GameSummary";
import { Question, getNewQuestions } from "../getNewQuestions"


export default function Game({ appState, setAppState }) {
    const [questions, setQuestions] = useState<Question[]>([]);

	useEffect(() => {
		displayNewQuestions();
	}, []);

	async function displayNewQuestions() {
		try {
			setAppState("loading")
			const newQuestions:Question[] = await getNewQuestions()
			setQuestions(newQuestions);
			setAppState("gamePlay")
		} catch (err) {
			setAppState("error")
		}
	}

	function handleGameEnd() {
		if (appState === "gameEnd") {
			displayNewQuestions()
		} else
		if (appState === "gamePlay") {
			setAppState("gameEnd")
		}
	}

	function calculateScore() {
		const checkedAnswers:number[] = questions.map(q => {
			if (q.correct_answer === q.selected_answer) {
				return 1
			}
			return 0
		})
		const score = checkedAnswers.reduce((score, ckeckedAnswer) => score + ckeckedAnswer, 0)
		return score
	}

	return (
		<div className="game text-container">
			{appState === "error" ?
				<div className="error-message"> An error ocured. Please try again later.</div>
				:
				<div>
					<Questions
						questions={questions}
						setQuestions={setQuestions}
						appState={appState}
						setAppState={setAppState}
					/>
					<GameSummary
						score={calculateScore()}
						handleGameEnd={handleGameEnd}
						appState={appState}
					/>
				</div>
			}
		</div>
	);
}
