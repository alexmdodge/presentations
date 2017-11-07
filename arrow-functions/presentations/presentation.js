// After the page loads for 1s fade in
var body = document.querySelector('.main');

// Fade in the page
setTimeout(function() {
  body.classList.add('page-loaded');
}, 100);