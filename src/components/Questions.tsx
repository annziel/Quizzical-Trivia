import React from 'react';
import Loader from "./Loader.jsx"
import type { Question } from "../getNewQuestions"


export default function Questions({ appState, questions, setQuestions }) {

	function handleAnswerClick(answer: string, id: number) {
		setQuestions((prevQuestions: Question[]) => prevQuestions.map(q => {
			if (q.id === id) {
				return { ...q, selected_answer: answer };
			}
			return q;
		}));
	}

	function getButtonClass(question: Question, answer: string) {
		if (appState === "quiz" && answer === question.selected_answer) {
			return "answer-option selected-answer";
		}
		if (appState === "results") {
			if (answer === question.correct_answer) {
				return "answer-option correct-answer";
			} else if (answer === question.selected_answer) {
				return "answer-option selected-wrong-answer";
			} 
		}
		return "answer-option";
	}

	return (
		<div className="questions-container">
			{appState === "loading" && <Loader />}
			{ (appState === "quiz" || appState === "results") && 
				questions.map((q: Question) => (
					<div className="question-box" key={q.id} id={`${q.id}`}>
						<h2 className="question-text">{q.question}</h2>
						<div className="answers-container">
							{q.shuffled_answers.map((answer: string) => (
								<button
									key={answer}
									className={getButtonClass(q, answer)}
									disabled={appState === "results" ? true : false}
									onClick={ () => handleAnswerClick(answer, q.id)} 
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
