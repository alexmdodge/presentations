// No super

class UI {
  constructor(selector) {
    this.selector = selector;
  }

  addClass(modifier) {
    this.element.classList.add(modifier);
  }
}

class Button extends UI {
  constructor(selector) {
    super(selector);
    this.element = document.querySelector(selector);
  }

  setup() {
    this.element.addEventListener('click', () => {
      super.addClass('clicked');
    })
  }
}

var button = new Button('.clear');
button.setup();

