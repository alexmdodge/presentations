const axios = require('axios');

// Axios is a promise base ajax library, you can also use
// fetch, request, etc.

// Promises are a structure which represent an eventual completion
// or failure of an asynchronous operation.

let goodResponse = axios.get('https://swapi.co/api/people/1/');
    
// I can then adds some responses to the promise
goodResponse.then((success) => {
    console.log('My request was successful! We got ', success.data.name);
}).catch((error) => {
    console.log('My request was unsuccessful!', error);        
});



// We can also have a bad response
let badResponse = axios.get('http://badresponse/test/nope');

// I can then adds some responses to the promise
badResponse.then((success) => {
    console.log('My request was successful! We got ', success);
}).catch((error) => {
    console.log('My request was unsuccessful! ', error.message);        
});