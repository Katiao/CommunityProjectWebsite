/*                                mobile view navigation                                               */

const open = document.getElementById('open');
const close = document.getElementById('close');

// show modal (mobile view navigation)
open.addEventListener('click', () => modal.classList.add('show-modal'));

// Hide modal (mobile view navigation)
close.addEventListener('click', () => modal.classList.remove('show-modal'));

/*                                 Form validation - Phone number                                              */

const form = document.getElementById('form');
const phone = document.getElementById('number');

//Show input error message
function showError(input, message) {
	const formControl = input.parentElement;
	formControl.className = 'contact-form-number-control error';
	const small = formControl.querySelector('small');
	small.innerText = message;
}

//Show success outline
function showSuccess(input) {
	const formControl = input.parentElement;
	formControl.className = 'contact-form-number-control success';
}

//Regex international phone number validation
function validateNumber() {
	const re = /^\+(?:[0-9] ?){6,14}[0-9]$/;

	if (!re.test(phone.value)) {
		showError(phone, 'Add International Dialing code e.g. +49 408 XXX XXXX');
	} else {
		showSuccess(phone);
	}
}

//Event listener
form.addEventListener('submit', function (e) {
	e.preventDefault();
	if (phone.value) {
		validateNumber();
	}
});
