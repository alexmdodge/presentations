function Builder() {}

Builder.prototype.setupButton = () => {
  let submit = document.querySelector('.submit');

  submit.addEventListener('click', () => {
    submit.classList.toggle('clicked');
  });
}