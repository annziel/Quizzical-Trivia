import React from 'react';
import getLoader from "./Loader.jsx"

export default function Questions({ appState, questions, setQuestions }) {

	function handleAnswerClick(e, id) {
		// cleanup of previously selected answers
		const elementsToToggle = document.querySelectorAll(`button[data-questionid='${e.target.dataset.questionid}']`);
		elementsToToggle.forEach(el => el.classList.remove("selected-answer"));
		// add a class to the selected answer
		e.target.classList.add("selected-answer");
		// updating the questions State
		setQuestions(prevQuestions => prevQuestions.map(q => {
			if (q.id === id) {
				return { ...q, selected_answer: e.target.dataset.answer };
			}
			return q;
		}));
	}

	function getButtonClass(question, answer) {
		if (appState === "gameEnd") {
			if (answer === question.correct_answer) {
				return "answer-option correct-answer";
			} else if (answer === question.selected_answer) {
				return "answer-option selected-wrong-answer";
			} else {
				return "answer-option";
			}
		} else {
			return "answer-option";
		};
	}


	return (
		<div className="questions-container">
			{appState === "loading" && getLoader()}
			{ (appState === "gamePlay" || appState === "gameEnd") && 
				questions.map((q) => (
					<div className="question-box" key={q.id} id={`${q.id}`}>
						<h2 className="question-text">{q.question}</h2>
						<div className="answers-container">
							{q.shuffled_answers.map((answer) => (
								<button
									key={answer}
									className={getButtonClass(q, answer)}
									disabled={appState === "gameEnd" ? true : false}
									onClick={(event) => handleAnswerClick(event, q.id)}
									data-questionid={q.id}
									data-answer={answer}
								>
									{answer}
								</button>
							))}
						</div>
						<hr />
					</div>
				))
			}
		</div>
	);
}
 