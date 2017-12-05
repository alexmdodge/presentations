debugger;

var pets = {
    dog: {
        name: 'arf',
        weight: 100,
    }, 
    cat: {
        name: 'meow',
        weight: 4,
    }
}

// Array of pets we own
var petTypes = Object.keys(pets);

// Where we'll add our pets to
var listContainer = document.createElement('ui');

// We'll loop through our list and output the
// names of each of our pets
var petList = petTypes.map((pet) => {
    var petLabel = document.createElement('li');
    petLabel.innerHTML = pet;

    petLabel.addEventListener('click', () => {
        var name = pets[pet].names;
        console.log('This is my ${pet} ${name}!');
    });

    return petLabel;
});

listContainer.appendChild(petList)
document.querySelector('body').appendChild(listContainer);