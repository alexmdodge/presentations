import { getClientDataLocal } from './local-client-fetch.js';
import { getSortedClients } from './local-sort.js';

var clients = [];
var activeClients = clients;

// Setup Web Workers
var dataWorker = new Worker('/src/data-web-worker.js');
var sortWorker = new Worker('/src/sort-web-worker.js');

function getClientDataWorker() {
    console.log('Starting Data Fetch');
    toggleLoading();

    dataWorker.postMessage({
        url: 'http://localhost:4000/clients',
    });
}

function sortClientsWorker() {
    console.log('Starting sort');
    toggleLoading();

    sortWorker.postMessage({
        clients: clients
    });
}

dataWorker.onmessage = function(response) {
    console.log('Done Data Fetch');
    toggleLoading();

    clients = response.data;
    activeClients = clients;
};

sortWorker.onmessage = function(response) {
    console.log('Done sorting');
    toggleLoading();

    activeClients = response.data;
}

var resultField = document.querySelector('.result');
var indicator = document.querySelector('.indicator');

var renderBtn = document.querySelector('.render');
var resetBtn = document.querySelector('.reset');

var workerStartBtn = document.querySelector('.load-worker');
var localStartBtn = document.querySelector('.load-local');

var workerSortBtn = document.querySelector('.sort-worker');
var localSortBtn = document.querySelector('.sort-local');

resetBtn.addEventListener('click', function(event) {
    clear();
    var clients = [];
    var activeClients = clients;
});

workerStartBtn.addEventListener('click', function(event) {
    getClientDataWorker();
});

localStartBtn.addEventListener('click', function(event) {
    toggleLoading();
    getClientDataLocal('http://localhost:4000/clients', function(newClients) {
        clients = newClients;
        activeClients = clients;
        toggleLoading();
    });
});

workerSortBtn.addEventListener('click', function(event) {
    sortClientsWorker();
});

localSortBtn.addEventListener('click', function(event) {
    clients = getSortedClients(clients);
    console.log('Done sorting clients');
    toggleLoading();
});

renderBtn.addEventListener('click', function(event) {
    toggleLoading();
    renderClientList();
    toggleLoading();
});

// Helpers

function toggleLoading() {
    indicator.classList.toggle('indicator-on');
}

function clear() {
    while (resultField.firstChild) {
        resultField.removeChild(resultField.firstChild);
    }
}

function renderClientList() {
    toggleLoading();
    
    activeClients.forEach(function(client) {
        var clientHtml = `
            <section class="client-item">
                <span> ${client.name} </span> --
                <span> ${client.country} </span> --
                <span> ${client.id} </span> --
                <span> $${client.balance} </span>
            </section>
        `.trim();

        var htmlWrapper = document.createElement('div');
        htmlWrapper.innerHTML = clientHtml;

        resultField.appendChild(htmlWrapper.firstChild);
    });

    setTimeout(function() {
        toggleLoading();
    }, 0);
}