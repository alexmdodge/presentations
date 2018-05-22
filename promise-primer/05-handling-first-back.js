// Sometimes we might have performance sensitive async operations
// where we have multiple promises and we simply want to take
// the first that returns.

var promise1 = new Promise(function(resolve, reject) {
    setTimeout(() => {
        console.log('Done Jedi');
        reject('Jedi');
    }, 500);
});

var promise2 = new Promise(function(resolve, reject) {
    setTimeout(() => {
        console.log('Done sith');
        resolve('Sith!');
    }, 1000);
});

Promise.race([promise1, promise2]).then(function(value) {
  console.log('The winning side is: ', value);
}).catch((error) => {
    console.log('Error', error);
});