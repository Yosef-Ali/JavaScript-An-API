let timer;
let deleteFirstPhotoDelay;

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
		createSlideShow(data.message);
	}
}

function createSlideShow(images) {
	let currentPosition = 0;
	clearTimeout(timer);
	clearTimeout(deleteFirstPhotoDelay);

	if (images.length > 1) {
		const slideShow = document.getElementById('slide-show');
		slideShow.innerHTML = `
	<div class="slides"
	 style="background-image: url('${images[0]}');">
	 </div>
	 <div class="slides"
	 style="background-image: url('${images[1]}');">
	 </div>
	`;
		currentPosition = +2;
		if (images.length == 2) currentPosition = 0;
		timer = setInterval(nextSlide, 3000);
	} else {
		const slideShow = document.getElementById('slide-show');
		slideShow.innerHTML = `
		<div class="slides"
		style="background-image: url('${images[0]}');">
		</div>
		<div class="slides">	</div>`;
	}

	function nextSlide() {
		document.getElementById('slide-show').insertAdjacentHTML(
			'beforeend',
			`
		<div class="slides"
	 style="background-image: url('${images[currentPosition]}');">
	 </div>
	`
		);
		deleteFirstPhotoDelay = setTimeout(() => {
			document.querySelector('.slides').remove();
		}, 1000);
		if (currentPosition + 1 >= images.length) {
			currentPosition = 0;
		} else {
			currentPosition++;
		}
	}
}
