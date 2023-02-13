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
	const res = await fetch('https://opentdb.com/api.php?amount=5&type=multiple');
	const apiData =  await res.json();
	return getOrganizedData(apiData.results);
}

function getOrganizedData(data: Question[]) {
	return data.map( (obj, index) => ({
		...obj,
		// change to escape the HTML encoding
		question: escapeEncoding(obj.question),
		// added to create the shuffled array of all possible answers without the HTML encoding
		shuffled_answers: shuffle([
			...obj.incorrect_answers.map(answer => escapeEncoding(answer)),
			escapeEncoding(obj.correct_answer)
		]),
		// added for answer checking
		selected_answer: "",
		// added for key and id properties
		id: index + 1,
	}));
}

function escapeEncoding(text: string) {
	return new DOMParser().parseFromString(text, 'text/html').body.textContent + '';
}

// randomize array using Durstenfeld shuffle algorithm
function shuffle(array: string[]) {
	const newArray = [...array];
	for (let i = newArray.length - 1; i > 0; i--) {
		const rand = Math.floor(Math.random() * (i + 1));
		[ newArray[i], newArray[rand]] = [newArray[rand], newArray[i] ];
	}
	return newArray;
}
