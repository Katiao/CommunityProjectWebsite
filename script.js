/* ********************mobile view navigation***********************************  */

const modal = document.getElementById('modal');
const open = document.getElementById('open');
const close = document.getElementById('close');

// show modal (mobile view navigation)
open.addEventListener('click', () => modal.classList.add('show-modal'));

// Hide modal (mobile view navigation)
close.addEventListener('click', () => modal.classList.remove('show-modal'));

//Hide Modal when user clicks on a menu item (mobile view)
document.querySelectorAll('.menu-nav').forEach((item) => {
	item.addEventListener('click', (event) => {
		modal.classList.remove('show-modal');
	});
});

/* ********************back to top button***********************************  */
const backToTopBtn = document.querySelector('.back-to-top');

// When the user scrolls down 20px from the top of the document, show the button
window.onscroll = function () {
	scrollFunction();
};

function scrollFunction() {
	if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
		backToTopBtn.classList.add('show');
	} else {
		backToTopBtn.classList.remove('show');
	}
}

// When the user clicks on the button, scroll to the top of the document
function topFunction() {
	document.getElementById('hero').scrollIntoView({ behavior: 'smooth' });
}

//event listener
backToTopBtn.addEventListener('click', topFunction);

/* ********************* Form Validation ***************************************** */

const form = document.getElementById('form');
const messageContainer = document.querySelector('.message-container');

let isValid = false;

function validateForm() {
	//validation using constraint API. Method on form will return boolean value
	const isValid = form.checkValidity();

	// if form is valid, success message
	if (isValid) {
		messageContainer.style.visibility = 'visible';
		messageContainer.style.display = 'inline-block';
	}
}

//store submitted form data
function storeFormData() {
	const user = {
		name: form.name.value,
		phone: form.phone.value,
		email: form.email.value,
		message: form.message.value,
	};

	// do something with user data
	console.log(user);
}

//when form is submitted this will run
function processFormData(e) {
	e.preventDefault();
	validateForm();
	//store data if valid
	if (isValid) {
		storeFormData();
	}
}

// Event Listener
form.addEventListener('submit', processFormData);

/* *********************Reviews Section Slider *********************************** */

import people from './data.js';

const container = document.querySelector('.slide-container');
const nextBtn = document.querySelector('.next-btn');
const prevBtn = document.querySelector('.prev-btn');

container.innerHTML = people
	.map((person, slideIndex) => {
		const { img, name, job, text } = person;

		let position = 'next';
		if (slideIndex === 0) {
			position = 'active';
		}
		if (slideIndex === people.length - 1) {
			position = 'last';
		}

		return `
    <article class="slide ${position}">
							<img src="${img}" class="img" alt="${name}">
							<h4>${name}</h4>
							<p class="title">${job}</p>
							<p class="text">${text}</p>
							<div class="quote-icon">
								<i class="fas fa-quote-right"></i>
							</div>
							
						</article>
    `;
	})
	.join('');

const startSlider = (type) => {
	// get all three slides: active, last and next
	const active = document.querySelector('.active');
	const last = document.querySelector('.last');
	let next = active.nextElementSibling;
	//if we run out of next slides, next becomes first slide
	if (!next) {
		next = container.firstElementChild;
	}

	active.classList.remove(['active']);
	last.classList.remove(['last']);
	next.classList.remove(['next']);

	//if user clicks on prev button, change positions going backwards
	if (type === 'prev') {
		active.classList.add('next');
		last.classList.add('active');
		let next = last.previousElementSibling;
		//if we run out of previous elements, next becomes last slide
		if (!next) {
			next = container.lastElementChild;
		}
		next.classList.remove(['next']);
		next.classList.add('last');
		// we don't want the last bit to run so we return
		return;
	}

	active.classList.add('last');
	last.classList.add('next');
	next.classList.add('active');
};

nextBtn.addEventListener('click', () => {
	startSlider();
});

prevBtn.addEventListener('click', () => {
	startSlider('prev');
});

/* *********************Blog section - fetch data from API using Strapi *********************************** */

const BLOG_URL = 'http://localhost:1337/blog-posts';
const rootNode = document.getElementById('articles');

//function that generates blog HTML template:
function blogHTMLTemplate(data) {
	const { title, description, date, minread } = data;
	const img = data.image.name;
	return `<Article class="article">
	<img src=${img}>
	<div class="blog-text">
		<h4 class="heading">${title}</h4>
		<div class="post-info"><span>${date}</span> <br/> 
		<span>min read: ${minread} mins</span></div>
		<p> ${description}</p>
		<button class="btn-more">Read More</button>
	</div>
</Article>`;
}

//Loop through data and render it to the DOM
function renderData(node, data) {
	const html = data.map((item) => blogHTMLTemplate(item)).join('');
	node.innerHTML = html;
}

//Fetch data from Strapi API
async function getData(url) {
	try {
		const response = await fetch(url);
		const data = await response.json();
		renderData(rootNode, data);
	} catch (error) {
		console.log('ERROR: ', error.message);
	}
}

//call function
getData(BLOG_URL);
