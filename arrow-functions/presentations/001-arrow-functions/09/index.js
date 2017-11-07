/* * * * * Using Regular Functions * * * * */

function SubmitBuilder(selector) {
  this.selector = selector;
}

SubmitBuilder.prototype.setupButton = function() {
  let submit = document.querySelector(this.selector);

  submit.addEventListener('click', function() {
    console.log(this);
    submit.classList.toggle('clicked');
  });
}

var submitBuilder = new SubmitBuilder('.submit');
submitBuilder.setupButton();

console.dir(submitBuilder.setupButton);

/* * * * * End Regular Functions * * * * */

/* * * * * Using Arrow Functions * * * * */

function ResetBuilder(selector) {
  this.selector = selector;
}

ResetBuilder.prototype.setupButton = () => {
  let reset = document.querySelector(this.selector);

  reset.addEventListener('click', () => {
    console.log(this);
    reset.classList.toggle('clicked');
  });
};

var resetBuilder = new ResetBuilder('.reset');
try {
  resetBuilder.setupButton();
} catch (error) {
  console.log(error);
}

/* * * * * End Arrow Functions * * * * */

/* * * * * Using Both * * * * */

function ClearBuilder(selector) {
  this.selector = selector;
}

ClearBuilder.prototype.setupButton = function() {
  let clear = document.querySelector(this.selector);

  clear.addEventListener('click', () => {
    console.log(this);
    clear.classList.toggle('clicked');
  });
};

var clearBuilder = new ClearBuilder('.clear');
clearBuilder.setupButton();

console.dir(clearBuilder.setupButton);

