var animals = {
    dog: {
        name: 'arf',
        weight: 100,
    }, 
    cat: {
        name: 'meow',
        weight: 4,
    }
}

// Console log references shallow copy
console.log('Original animals: ', animals);

// This changes before the log looks at the object reference
animals.dog.name = 'growl';

// It's best to use primitive values or keep state immutable
console.log('Changed animals: ', animals);

// Here we're replacing our state
animals = Object.assign({}, animals, {
    dog: {
        name: 'woof',
        weight: 150,
    }
});

console.log('New animals reference: ', animals);