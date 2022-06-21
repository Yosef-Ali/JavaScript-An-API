// fetch('https://dog.ceo/api/breeds/list/all')
// 	.then(function (response) {
// 		return response.json();
// 	})
// 	.then(function (data) {
// 		console.log(data);
// 	});

async function getDogs() {
	const response = await fetch('https://dog.ceo/api/breeds/list/all');
	const data = await response.json();
	createBreedList(data.message);
}

getDogs();

function createBreedList(breeds) {
	const breedList = document.getElementById('breed-list');
	breedList.innerHTML = `<select onchange='loadByBreed(this.value)'>
		<option value="">Select a breed</option>
		${Object.keys(breeds)
			.map(function (breed) {
				return `<option>${breed}</option>`;
			})
			.join('')}
	</select>`;
}

async function loadByBreed(breed) {
	if (breed != 'Select a breed') {
		const response = await fetch(`https://dog.ceo/api/breed/${breed}/images`);
		const data = await response.json();
		//createDogList(data.message);
		console.log(data);
	}
}
