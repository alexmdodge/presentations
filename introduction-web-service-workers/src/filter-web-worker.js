function getFilteredClientList(clients, filter) {
    var filterBy = filter.by;
    var filterKey = filter.key.toLowerCase();

    return clients.filter(client => {
        var clientField = client[filterBy];
        var lowerCaseField = clientField.toLowerCase();
        return lowerCaseField.indexOf(filterKey) > -1;
    });
}

onmessage = function (event) {
    console.log('Filtering message received from main script.');
    var clients = event.data.clients;
    var filter = event.data.filter;

    postMessage(getFilteredClientList(clients, filter));
}