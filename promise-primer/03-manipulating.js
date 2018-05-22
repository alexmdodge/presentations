const axios = require('axios');

// Promises are most useful because they can be manipulated
// transformed, and passed around in many different ways

let goodResponse = axios.get('https://swapi.co/api/people/1/');
    
// I can then adds some responses to the promise
let transformedResponse = goodResponse.then((success) => {
    console.log('My request was successful! We can now clean up the response.');
    let data = success.data;

    return {
        name: data.name,
        gender: data.gender,
        eyeColour: data.eye_color,
        homeworld: data.homeworld,
    }
}).catch((error) => {
    console.log('My request was unsuccessful!', error);        
});




// We can also use the resolved handler to make other requests
let homeWorldResponse = transformedResponse.then((success) => {
    console.log('My transformed data is: ', success);

    return axios.get(success.homeworld);
}).catch((error) => {
    console.log('My transformed was unsuccessful!', error);        
});




homeWorldResponse.then((success) => {
    console.log('The home world is: ', success.data.name);
}).catch((error) => {
    console.log('My home world was unsuccessful!', error);        
});