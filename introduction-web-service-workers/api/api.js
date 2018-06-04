const cors = require('cors');
const faker = require('faker');
const express = require('express');
const app = express();

app.use(cors())

app.get('/clients', function(req, res) {
    let clientsData = [];

    for (let i = 0; i < 1000; i++) {
        clientsData.push({
            name: faker.company.companyName(),
            postalCode: faker.address.zipCode(),
            country: faker.address.country(),
            street: faker.address.streetAddress(),
            account: faker.finance.account(),
        });
    }

    res.json({
        clients: clientsData,
    });

    res.end();
});

app.listen(3000);
console.log('API listening on http://localhost:3000');