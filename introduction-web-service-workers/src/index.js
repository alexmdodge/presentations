import { getClientDataLocal } from './local-client-fetch.js';
import { getSortedClients } from './local-sort.js';

var filterCategories = document.getElementsByName('filter-categories');
var filterKeyInput = document.querySelector('.filter-input');
var resultField = document.querySelector('.filter-result');
var filterBtn = document.querySelector('.apply');
var resetBtn = document.querySelector('.reset');

var workerStartBtn = document.querySelector('.load-worker');
var localStartBtn = document.querySelector('.load-local');

var workerSortBtn = document.querySelector('.sort-worker');
var localSortBtn = document.querySelector('.sort-local');

var clients = [];
var activeClients = clients;

// Setup Web Workers
var filterWorker = new Worker('/src/filter-web-worker.js');
var dataWorker = new Worker('/src/data-web-worker.js');
var sortWorker = new Worker('/src/sort-web-worker.js');

// Functions that utilize postMessage and onmessage
function filterClientData() {
    var filterKey = filterKeyInput.value;
    var filterCategory;

    for (let i = 0; i < filterCategories.length; i++) {
        var category = filterCategories[i];
        
        if (category.checked) {
            filterCategory = category.value;
        }
    }

    console.log('Starting Filtering');

    filterWorker.postMessage({
        clients: clients,
        filter: {
            by: filterCategory,
            key: filterKey,
        }
    });
}

function getClientData() {
    console.log('Starting Data Fetch');
    
    dataWorker.postMessage({
        url: 'http://localhost:4000/clients',
    });
}

function sortMostOwed() {
    sortWorker.postMessage({
        clients: clients
    });
}

dataWorker.onmessage = function(response) {
    console.log('Done Data Fetch');
    
    clients = response.data;
    filterClientData();
};

filterWorker.onmessage = function(response) {
    console.log('Done Filtering');
    
    activeClients = response.data;
};

sortWorker.onmessage = function(response) {
    console.log('Done sorting');

    activeClients = response.data;
}

// DOM rendering helpers
function renderClientList() {
    console.log('Starting to render client list');

    while (resultField.firstChild) {
        resultField.removeChild(resultField.firstChild);
    }
    
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
        console.log('Done rendering client list');
    }, 0);
}

resetBtn.addEventListener('click', function(event) {
    activeClients = clients;
    renderClientList();
});

filterBtn.addEventListener('click', function(event) {
    filterClientData();
});

workerStartBtn.addEventListener('click', function(event) {
    getClientData();
});

localStartBtn.addEventListener('click', function(event) {
    getClientDataLocal('http://localhost:4000/clients', function(newClients) {
        console.log('Using local function');
        clients = newClients;
        filterClientData();
    });
});

workerSortBtn.addEventListener('click', function(event) {
    sortMostOwed();
});