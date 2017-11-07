// Explicit Binding

var type = 'none';

var burger = {
  type: 'Cheeseburger'
};

var milkshake = {
  type: 'Chocolate'
};

var foodChooser = () => {
  console.log(this.type);
};

var otherChooser = function() {
  console.log(this.type);
}

var bounded = foodChooser.bind(milkshake, type);
bounded();
foodChooser.call(burger, type);
foodChooser.apply(burger, [type]);

var arrow = () => {};

try {
  var newArrow = new arrow();
} catch (error) {
  console.log(error);
  console.dir(arrow);
}

