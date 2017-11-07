
// Object Methods
var person = {
  name: 'Alex',
  sayName: () => {
    this.name; // undefined
  }
}

// Object Prototypes
function Person(name) {
  this.name = name;
}
Person.prototype.sayName = () => {
  console.log(this.name); // undefined
}

// Callback function where dynamic
var button = document.createElement('myButton');  
try {
  button.addEventListener('click', () => {  
    this.innerHTML = 'Clicked button'; // undefined
  });
} catch (error) {
  console.log(error);
}

// An example where they can be useful
var button = document.querySelector('.alert');
button.addEventListener('click', function() {
  setTimeout(function() {
    console.log(this)
  }, 1000);
});

var otherButton = document.querySelector('.clear');
otherButton.addEventListener('click', function() {
  setTimeout(() => {
    console.log(this)
  }, 1000);
});