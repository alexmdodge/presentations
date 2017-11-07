
// Similar Prototypal definition
function Bin(capacity, colour) {
  this.capacity = capacity;
  this.colour = colour;
  this.fullness = 0;
}

Bin.prototype.fill = function(amount) {
  this.fullness += amount;
  if (this.fullness > this.capacity) {
    console.log('The bin is full!');
  }
}

function RecycleBin(capacity, colour) {
  Bin.call(this, capacity, colour);
}

RecycleBin.prototype = Object.create(Bin.prototype);

RecycleBin.prototype.shred = function() {
  this.fullness = 0;
  console.log('You shredded all the paper.');
}