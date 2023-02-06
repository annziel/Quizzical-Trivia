import React from 'react';
import getLoader from "./Loader.jsx"

export default function Questions({ questions, setQuestions, appState, setAppState }) {

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
			if (appState === "gameEnd") {
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
					disabled={appState === "gameEnd" ? true : false}
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
			{appState === "loading" && getLoader()}
			{(appState === "gamePlay" || appState === "gameEnd") && questionsElements}
		</div>
	);
}
 