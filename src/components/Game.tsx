import React, { useState, useEffect } from 'react';
import Questions from "./Questions";
import GameSummary from "./GameSummary";

type Question = {
    category: string,
    type: string,
    difficulty: string,
    question: string,
    correct_answer: string,
    incorrect_answers: string[],
	shuffled_answers: string[],
	selected_answer: string,
	id: number,
}


export default function Game() {
    const [questions, setQuestions] = useState<Question[]>([]);
	const [newGame, setNewGame] = useState(false)
	const [isLoading, setIsLoading] = useState(false)
	const [isError, setIsError] = useState(false)

	useEffect(() => {
		async function getApi() {
			try {
				setIsLoading(true)
				const res = await fetch('https://opentdb.com/api.php?amount=5&type=multiple');
				const ApiData = await res.json();
				const questionsToRender = prepareToRender(ApiData.results);
				setQuestions(questionsToRender);
				setIsLoading(false)
			}
			catch(err) {
				setIsError(true)
				setIsLoading(false)
			}
		}
		getApi();
	}, [newGame]);

	function prepareToRender(array: Question[]) {
		return array.map((obj, index) => {
			const newObj = {
				...obj,
				// making the array of possible answers and shuffle it for a random order
				shuffled_answers: getShuffledAnswers([...obj.incorrect_answers, obj.correct_answer]),
				// for answer checking
				selected_answer: "",
				// for key and id properties
				id: index + 1,
			};
			return newObj;
		});
	}

	// randomize array in-place using Durstenfeld shuffle algorithm
	function getShuffledAnswers(array: string[]) {
		const newArray = [...array];
		for (let i = newArray.length - 1; i > 0; i--) {
			const rand = Math.floor(Math.random() * (i + 1));
			[newArray[i], newArray[rand]] = [newArray[rand], newArray[i]];
		}
		return newArray;
	}


	const [answersChecked, setAnswersChecked] = useState(false);


	function handleGameSummaryChange() {
		if (answersChecked === true) {
			setNewGame(prevState => !prevState)
		}
		setAnswersChecked((prevState) => !prevState);
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
			{isError ?
				<div className="error-message"> An error ocured. Please try again later.</div>
				:
				<div>
					<Questions
						questions={questions}
						setQuestions={setQuestions}
						isAnswersChecked={answersChecked}
						isLoading={isLoading}
					/>
					<GameSummary
						isAnswersChecked={answersChecked}
						score={calculateScore()}
						handleGameSummaryChange={handleGameSummaryChange}
						isLoading={isLoading}
					/>
				</div>
			}
		</div>
	);
}
