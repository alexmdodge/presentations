const cors = require('cors');
const faker = require('faker');
const express = require('express');
const app = express();

app.use(cors())

function getRandomPurchases() {
    var purchases = [];

    for (let i = 0; i < 1000; i++) {
        var amount = Math.random() * 50;
        amount = (Math.random * 2) > 1 ? amount * -1 : amount;
        purchases.push(amount);
    }

    return purchases;
}

app.get('/clients', function(req, res) {
    let clientsData = [];

    for (let i = 0; i < 10000; i++) {
        clientsData.push({
            name: faker.company.companyName(),
            postalCode: faker.address.zipCode(),
            country: faker.address.country(),
            street: faker.address.streetAddress(),
            account: faker.finance.account(),
            purchases: getRandomPurchases(),
        });
    }

    res.json({
        clients: clientsData,
    });

    res.end();
});

app.listen(4000);
console.log('API listening on http://localhost:4000');