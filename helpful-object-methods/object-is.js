var result;

class Dog {
  constructor(name) {
    this.name = name;
  }
}

var winston = new Dog('Winston');
var winston2 = new Dog('Winston');
var rufus = new Dog('Rufus');

result = Object.is(winston, winston2);
result;

result = -0 === +0;
result;

result = Object.is(-0, +0);
result;
