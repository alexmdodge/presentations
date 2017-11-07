var result;

var empty = Object.create(null);
empty;

// Make a human
function Human() {
  this.height = 1.8;
  this.weight = 78;
}

Human.prototype.workout = function(hours) {
  var amountShed = hours * 1.584;
  this.weight = this.weight - amountShed;
  return `You worked out for ${hours} hour(s) and lost ${amountShed}kg!`;
};

function Me() {
  Human.call(this);
}

// Inherit things from the human
Me.prototype = Object.create(Human.prototype);
Me.prototype.constructor = Me;

var johnny = new Human();
result = johnny.workout(20);
result;

var alex = new Me();
result = alex.workout(1);
result;
