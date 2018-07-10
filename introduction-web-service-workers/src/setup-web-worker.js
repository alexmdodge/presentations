import { getClientDataLocal } from './local-client-fetch.js';

var clients = [];
var activeClients = clients;

// Setup Web Workers
var dataWorker = new Worker('/src/data-web-worker.js');

function getClientDataWorker() {
    console.log('Starting Data Fetch');
    startLoading();

    dataWorker.postMessage({
        url: 'http://localhost:4000/clients',
    });
}

dataWorker.onmessage = function(response) {
    console.log('Done Data Fetch');
    finishLoading();

    clients = response.data;
    activeClients = clients;
};

var resultField = document.querySelector('.result');
var indicator = document.querySelector('.indicator');

var renderBtn = document.querySelector('.render');
var resetBtn = document.querySelector('.reset');

var workerStartBtn = document.querySelector('.load-worker');
var localStartBtn = document.querySelector('.load-local');

resetBtn.addEventListener('click', function(event) {
    clear();
    clients = [];
    activeClients = clients;
});

workerStartBtn.addEventListener('click', function(event) {
    getClientDataWorker();
});

localStartBtn.addEventListener('click', function(event) {
    startLoading();
    getClientDataLocal('http://localhost:4000/clients', function(newClients) {
        clients = newClients;
        activeClients = clients;
        finishLoading();
    });
});

renderBtn.addEventListener('click', function(event) {
    startLoading();
    renderClientList();
    finishLoading();
});

// Helper Functions

function startLoading() {
    indicator.classList.add('indicator-on');
}

function finishLoading() {
    indicator.classList.remove('indicator-on');
}

function clear() {
    while (resultField.firstChild) {
        resultField.removeChild(resultField.firstChild);
    }

    clients = [];
    activeClients = clients;
}

function renderClientList() {
    startLoading();

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
        finishLoading();
    }, 0);
}