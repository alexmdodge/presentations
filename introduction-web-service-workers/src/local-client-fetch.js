function getBalance(purchases) {
    var balance = 0;
    
    purchases.forEach(function(purchase) {
        balance += purchase;
    });

    return Math.round(balance);
}

function processId(accountId) {
    var numId = parseInt(accountId);
    var resultId = numId * numId;

    return Math.round(resultId / 1000);
}

function extractData(clients) {
    var trimmedClients = [];

    clients.forEach(function(client) {
        trimmedClients.push({
            name: client.name,
            country: client.country,
            id: processId(client.account),
            balance: getBalance(client.purchases),
            purchases: client.purchases,
        });
    });

    return trimmedClients;
}

export function getClientDataLocal(url, fn) {
    var requestUrl = url;
      
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
        if (xhr.readyState === 4) {
            var response = JSON.parse(this.responseText);
            var clients = extractData(response.clients);
            fn(clients);
        }
    }
    xhr.open('GET', requestUrl);
    xhr.send();
}