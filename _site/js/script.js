window.onload = function() {

	document.querySelector('.bg').classList.add('active');
	document.querySelector('header').classList.add('active');
	document.querySelector('h1').classList.add('active');
	document.querySelector('p').classList.add('active');

	var links = document.querySelectorAll('.anim-outer');

	for (var i = 0; i < links.length; i++) {
		links[i].classList.add('active');
	}
}