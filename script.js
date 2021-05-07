/*                                mobile view navigation                                               */

const modal = document.getElementById('modal');
const open = document.getElementById('open');
const close = document.getElementById('close');

// show modal (mobile view navigation)
open.addEventListener('click', () => modal.classList.add('show-modal'));

// Hide modal (mobile view navigation)
close.addEventListener('click', () => modal.classList.remove('show-modal'));

/*                                Reviews Section Slider                                                          */

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

const startSlider = type => {
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
