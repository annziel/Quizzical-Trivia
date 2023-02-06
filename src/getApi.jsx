export default async function getApi() {
	const res = await fetch('https://opentdb.com/api.php?amount=5&type=multiple');
	const apiData = await res.json();
	return apiData;
}
