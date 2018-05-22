const axios = require('axios');

// If we have many async requests all which return promises, we
// can use Promise.all to handle the result when they all return.

// Initialize an array with the id of four potential star wars people
var peopleIds = [1, 2, 3, 4];

// Map through and make a request with each of the arrays.
var peopleRequests = peopleIds.map((id, index) => {
    let response;

    if (index === 2) {
        response = axios.get(`https://swapi.co/api/people/asdfasdfasdfsad/`);
    } else {
        response = axios.get(`https://swapi.co/api/people/${id}/`);
    }

    return response.then((success) => {
            return success.data.name
        }).catch((error) => {
            return null;
        });
});

// Wait for all the requests to come back
Promise.all(peopleRequests).then((result) => {
    console.log('All of the people are: ', result);
});