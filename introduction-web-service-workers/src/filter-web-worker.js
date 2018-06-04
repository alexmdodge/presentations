function getFilteredClientList(clients, filter) {
    var filterBy = filter.by;
    var filterKey = filter.key;

    return clients.filter(client => {
        var clientField = client[filterBy];
        return clientField.indexOf(filterKey > -1);
    })
}

onmessage = function (event) {
    console.log('Message received from main script');
    var clients = event.data.clients;
    var filter = event.data.filter;

    postMessage(getFilteredClientList(clients, filter));
}