var result;

class Dog {
  constructor(name) {
    this.name = name;
  }
}

var winston = new Dog('Winston');
var winston2 = new Dog('Winston');
var anotherWinston = winston2;
var rufus = new Dog('Rufus');

result = Object.is(winston, anotherWinston);
result;

result = -0 === +0;
result;

result = Object.is(-0, +0);
result;
