/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _local_client_fetch_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./local-client-fetch.js */ \"./src/local-client-fetch.js\");\n/* harmony import */ var _local_sort_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./local-sort.js */ \"./src/local-sort.js\");\n\n\n\nvar clients = [];\nvar activeClients = clients;\n\n// Setup Web Workers\nvar dataWorker = new Worker('/src/data-web-worker.js');\nvar sortWorker = new Worker('/src/sort-web-worker.js');\n\nfunction getClientDataWorker() {\n    console.log('Starting Data Fetch');\n    toggleLoading();\n\n    dataWorker.postMessage({\n        url: 'http://localhost:4000/clients',\n    });\n}\n\nfunction sortClientsWorker() {\n    console.log('Starting sort');\n    toggleLoading();\n\n    sortWorker.postMessage({\n        clients: clients\n    });\n}\n\ndataWorker.onmessage = function(response) {\n    console.log('Done Data Fetch');\n    toggleLoading();\n\n    clients = response.data;\n    activeClients = clients;\n};\n\nsortWorker.onmessage = function(response) {\n    console.log('Done sorting');\n    toggleLoading();\n\n    activeClients = response.data;\n}\n\nvar resultField = document.querySelector('.result');\nvar indicator = document.querySelector('.indicator');\n\nvar renderBtn = document.querySelector('.render');\nvar resetBtn = document.querySelector('.reset');\n\nvar workerStartBtn = document.querySelector('.load-worker');\nvar localStartBtn = document.querySelector('.load-local');\n\nvar workerSortBtn = document.querySelector('.sort-worker');\nvar localSortBtn = document.querySelector('.sort-local');\n\nresetBtn.addEventListener('click', function(event) {\n    clear();\n    var clients = [];\n    var activeClients = clients;\n});\n\nworkerStartBtn.addEventListener('click', function(event) {\n    getClientDataWorker();\n});\n\nlocalStartBtn.addEventListener('click', function(event) {\n    toggleLoading();\n    Object(_local_client_fetch_js__WEBPACK_IMPORTED_MODULE_0__[\"getClientDataLocal\"])('http://localhost:4000/clients', function(newClients) {\n        clients = newClients;\n        activeClients = clients;\n        toggleLoading();\n    });\n});\n\nworkerSortBtn.addEventListener('click', function(event) {\n    sortClientsWorker();\n});\n\nlocalSortBtn.addEventListener('click', function(event) {\n    clients = Object(_local_sort_js__WEBPACK_IMPORTED_MODULE_1__[\"getSortedClients\"])(clients);\n    console.log('Done sorting clients');\n    toggleLoading();\n});\n\nrenderBtn.addEventListener('click', function(event) {\n    toggleLoading();\n    renderClientList();\n    toggleLoading();\n});\n\n// Helpers\n\nfunction toggleLoading() {\n    indicator.classList.toggle('indicator-on');\n}\n\nfunction clear() {\n    while (resultField.firstChild) {\n        resultField.removeChild(resultField.firstChild);\n    }\n}\n\nfunction renderClientList() {\n    toggleLoading();\n    \n    activeClients.forEach(function(client) {\n        var clientHtml = `\n            <section class=\"client-item\">\n                <span> ${client.name} </span> --\n                <span> ${client.country} </span> --\n                <span> ${client.id} </span> --\n                <span> $${client.balance} </span>\n            </section>\n        `.trim();\n\n        var htmlWrapper = document.createElement('div');\n        htmlWrapper.innerHTML = clientHtml;\n\n        resultField.appendChild(htmlWrapper.firstChild);\n    });\n\n    setTimeout(function() {\n        toggleLoading();\n    }, 0);\n}\n\n//# sourceURL=webpack:///./src/index.js?");

/***/ }),

/***/ "./src/local-client-fetch.js":
/*!***********************************!*\
  !*** ./src/local-client-fetch.js ***!
  \***********************************/
/*! exports provided: getClientDataLocal */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"getClientDataLocal\", function() { return getClientDataLocal; });\nfunction getBalance(purchases) {\n    var balance = 0;\n    \n    purchases.forEach(function(purchase) {\n        balance += purchase;\n    });\n\n    return Math.round(balance);\n}\n\nfunction processId(accountId) {\n    var numId = parseInt(accountId);\n    var resultId = numId * numId;\n\n    return Math.round(resultId / 1000);\n}\n\nfunction extractData(clients) {\n    var trimmedClients = [];\n\n    clients.forEach(function(client) {\n        trimmedClients.push({\n            name: client.name,\n            country: client.country,\n            id: processId(client.account),\n            balance: getBalance(client.purchases),\n            purchases: client.purchases,\n        });\n    });\n\n    return trimmedClients;\n}\n\nfunction getClientDataLocal(url, fn) {\n    var requestUrl = url;\n      \n    var xhr = new XMLHttpRequest();\n    xhr.onreadystatechange = function() {\n        if (xhr.readyState === 4) {\n            var response = JSON.parse(this.responseText);\n            var clients = extractData(response.clients);\n            fn(clients);\n        }\n    }\n    xhr.open('GET', requestUrl);\n    xhr.send();\n}\n\n//# sourceURL=webpack:///./src/local-client-fetch.js?");

/***/ }),

/***/ "./src/local-sort.js":
/*!***************************!*\
  !*** ./src/local-sort.js ***!
  \***************************/
/*! exports provided: getSortedClients */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"getSortedClients\", function() { return getSortedClients; });\nfunction getSortedClients(clients) {\n    console.log('Sorting clients');\n    var sortedClients = clients.sort(function(a, b) {\n        var difference = a.balance - b.balance;\n        \n        return difference * -1; \n    });\n\n    return sortedClients.slice(0, 5);\n}\n\n//# sourceURL=webpack:///./src/local-sort.js?");

/***/ })

/******/ });