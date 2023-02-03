import React, { useState, useEffect } from 'react';

export default function Questions(props) {
// props.isAnswersChecked

	const [questions, setQuestions] = useState([]);

	useEffect(() => {
		async function getApi() {
			const res = await fetch('https://opentdb.com/api.php?amount=5&type=multiple');
			const ApiData = await res.json();
			console.log(ApiData.results);
			const questionsToRender = prepareToRender(ApiData.results);
			console.log(questionsToRender);
			setQuestions(questionsToRender);
			console.log(questions);
		}
		getApi();
	}, []);

	function prepareToRender(array) {
		return array.map((obj, index) => {
			console.log(obj);
			const newObj = {
				...obj,
				// making the array of possible answers and shuffle it for a random order
				shuffledAnswers: getShuffledAnswers([...obj.incorrect_answers, obj.correct_answer]),
				// for a key property
				id: index + 1,
			};
			return newObj;
		});
	}

	// randomize array in-place using Durstenfeld shuffle algorithm
	function getShuffledAnswers(array) {
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

	function handleAnswerClick(e) {

	}

	function getAnswersElements(question) {
		return question.shuffledAnswers.map((answer) => (
			<button
				type="button"
				className="answer-option"
				onClick={handleAnswerClick}
			>
				{escapeEncoding(answer)}
			</button>
		));
	}

	const questionsElements = questions.map((q) => {
		console.log(q);
		return (
			<div className="question-box" key={q.id}>
				<h2 className="question-text">{escapeEncoding(q.question)}</h2>
				<div className="answers-container">
					{getAnswersElements(q)}
				</div>
				<hr />
			</div>
		);
	});

	return (
		<div className="questions-container">
			{questionsElements}
		</div>
	);
}
