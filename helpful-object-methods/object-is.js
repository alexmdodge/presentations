var result;

class Dog {
  constructor(name) {
    this.name = name;
  }
}

var winston = new Dog('Winston');
var winston2 = new Dog('Winston');
var another = winston;
var rufus = new Dog('Rufus');

result = Object.is(winston, rufus);
result;

result = -0 === +0;
result;

result = Object.is(-0, +0);
result;

result = Object.is(1, 4);
result;

var sum = 1+ 1;
sum;
