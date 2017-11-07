// Looking at the differences between the two definitions
var adder = function(x, y) {
  return x - y;
}

var subtractor = (x, y) => x - y;


console.dir(adder);
console.dir(subtractor);