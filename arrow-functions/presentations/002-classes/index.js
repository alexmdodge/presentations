
class Bin {
  constructor(capacity, colour) {
    this.capacity = capacity;
    this.colour = colour;
    this.fullness = 0;
  }

  fill(amount) {
    this.fullness += amount;
    if (this.fullness > this.capacity) {
      console.log('The bin is full!');
    }
  }

  admire() {
    let amount = Math.round((this.fullness / this.capacity) * 100);
    console.log(`What a nice ${this.colour} bin. Looks to be about ${amount}% full.`);
  }

  empty() {
    this.fullness = 0;
    console.log('You made a mess on the floor.');
  }
}

class RecycleBin extends Bin {
  constructor(capacity, colour) {
    super(capacity, colour);
  }

  shred() {
    this.fullness = 0;
    console.log('All the paper was shredded.');
  }
}
