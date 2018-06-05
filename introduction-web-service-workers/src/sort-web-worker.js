function getSortedClients(clients) {
    console.log('Sorting clients');
    var sortedClients = clients.sort(function(a, b) {
        var difference = a.balance - b.balance;
        
        return difference * -1; 
    });

    return sortedClients.slice(0, 5);
}

onmessage = function (event) {
    console.log('Sorting clients.');
    var clients = event.data.clients;

    postMessage(getSortedClients(clients));
}