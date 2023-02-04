import React, { useState, useEffect } from 'react';

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

export default function Questions({ isAnswersChecked }) {
	const [questions, setQuestions] = useState<Question[]>([]);

	useEffect(() => {
		async function getApi() {
			const res = await fetch('https://opentdb.com/api.php?amount=5&type=multiple');
			const ApiData = await res.json();
			const questionsToRender = prepareToRender(ApiData.results);
			setQuestions(questionsToRender);
		}
		getApi();
	}, []);

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

	function escapeEncoding(text) {
		return new DOMParser().parseFromString(text, 'text/html').body.textContent;
	}

	function handleAnswerClick(e, id) {
		// cleanup of previously selected answers
		const elementsToToggle = document.querySelectorAll(`button[data-questionid='${e.target.dataset.questionid}']`);
		elementsToToggle.forEach(el => el.classList.remove("selected-answer"));
		// select answer
		e.target.classList.add("selected-answer");
		// updating the questions State
		setQuestions(prevQuestions => prevQuestions.map(q => {
			if (q.id === id) {
				return { ...q, selected_answer: e.target.dataset.answer };
			}
			return q;
		}));
	}

	function getAnswersElements(question) {
		return question.shuffled_answers.map((answer) => {
			let buttonClass = "";
			if (isAnswersChecked) {
				if (answer === question.correct_answer) {
					buttonClass = "answer-option correct-answer";
				} else if (answer === question.selected_answer) {
					buttonClass = "answer-option selected-wrong-answer";
				} else {
					buttonClass = "answer-option not-selected-wrong-answer";
				}
			} else {
				buttonClass = "answer-option";
			}

			return (
				<button
					onClick={(event) => handleAnswerClick(event, question.id)}
					data-questionid={question.id}
					data-answer={answer}
					key={answer}
					className={buttonClass}
				>
					{escapeEncoding(answer)}
				</button>
			);
		});
	}

	const questionsElements = questions.map((q) => (
		<div className="question-box" key={q.id} id={`${q.id}`}>
			<h2 className="question-text">{escapeEncoding(q.question)}</h2>
			<div className="answers-container">
				{getAnswersElements(q)}
			</div>
			<hr />
		</div>
	));

	return (
		<div className="questions-container">
			{questionsElements}
		</div>
	);
}
 