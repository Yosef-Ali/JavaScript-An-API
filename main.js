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
	console.log(data);
}

getDogs();
