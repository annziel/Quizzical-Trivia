export type Question = {
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

export async function getNewQuestions() {
	const apiData = await getApi();
	const questionsWithoutEncoding = getDataWithoutEncoding(apiData.results);
	return prepareToRender(questionsWithoutEncoding);
}

async function getApi() {
	const res = await fetch('https://opentdb.com/api.php?amount=5&type=multiple');
	return await res.json();
}

function getDataWithoutEncoding(data: Question[]) {
	return data.map(obj => {
		const newObj = {
			...obj,
			question: `${escapeEncoding(obj.question)}`,
			correct_answer: `${escapeEncoding(obj.correct_answer)}`,
			incorrect_answers: obj.incorrect_answers.map(answer => `${escapeEncoding(answer)}`),
		};
		return newObj;
	});
}

function escapeEncoding(text: string) {
	return new DOMParser().parseFromString(text, 'text/html').body.textContent;
}

function prepareToRender(array: Question[]) {
	return array.map((obj, index) => {
		const newObj = {
			...obj,
			// making the array of possible answers and shuffle it
			shuffled_answers: getShuffledAnswers([...obj.incorrect_answers, obj.correct_answer]),
			// for answer checking
			selected_answer: "",
			// for key and id properties
			id: index + 1,
		};
		return newObj;
	});
}

// randomize array using Durstenfeld shuffle algorithm
function getShuffledAnswers(array: string[]) {
	const newArray = [...array];
	for (let i = newArray.length - 1; i > 0; i--) {
		const rand = Math.floor(Math.random() * (i + 1));
		[newArray[i], newArray[rand]] = [newArray[rand], newArray[i]];
	}
	return newArray;
}
