function Builder() {}

Builder.prototype.setupButton = function() {
  let submit = document.querySelector('.submit');

  submit.addEventListener('click', function() {
    submit.classList.toggle('clicked');
  });
}

let uiBuilder = new Builder();
uiBuilder.setupButton();