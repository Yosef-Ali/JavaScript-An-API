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
	breedList.innerHTML = `<select>
		<option value="">Select a breed</option>
		${Object.keys(breeds)
			.map(function (breed) {
				return `<option>${breed}</option>`;
			})
			.join('')}
	</select>`;
}
