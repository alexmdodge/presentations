export function getSortedClients(clients) {
    var sortedClients = clients.sort(function(a, b) {
        var byExpensiveA = a.purchases.sort(function(a, b) {
            return (a - b) * -1;
        });

        var byExpensiveB = b.purchases.sort(function(a, b) {
            return (a - b) * -1;
        });

        var difference = byExpensiveA[0] - byExpensiveB[0];
        
        return difference * -1; 
    });

    return sortedClients.slice(0, 5);
}