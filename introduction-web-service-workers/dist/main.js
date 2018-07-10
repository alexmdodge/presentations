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
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _setup_web_worker_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./setup-web-worker.js */ \"./src/setup-web-worker.js\");\n/* harmony import */ var _setup_service_worker_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./setup-service-worker.js */ \"./src/setup-service-worker.js\");\n/* harmony import */ var _setup_service_worker_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_setup_service_worker_js__WEBPACK_IMPORTED_MODULE_1__);\n\n\n\n//# sourceURL=webpack:///./src/index.js?");

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

/***/ "./src/setup-service-worker.js":
/*!*************************************!*\
  !*** ./src/setup-service-worker.js ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("/**\n * There are a couple of steps to setup a Service Worker,\n *   - determine if the Service Worker API is available\n *   - register the service worker at the root of the domain\n */\n\nfunction onLoad() {\n    navigator.serviceWorker.register('/service-worker.js')\n        .then(function (registration) {\n            console.log('SW registered with scope: ', registration.scope);\n        }, function (error) {\n            console.log('SW registration failed: ', error);\n        });\n}\n\n// if ('serviceWorker' in navigator) {\n//     window.addEventListener('load', onLoad);\n// }\n\n\n//# sourceURL=webpack:///./src/setup-service-worker.js?");

/***/ }),

/***/ "./src/setup-web-worker.js":
/*!*********************************!*\
  !*** ./src/setup-web-worker.js ***!
  \*********************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _local_client_fetch_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./local-client-fetch.js */ \"./src/local-client-fetch.js\");\n\n\nvar clients = [];\nvar activeClients = clients;\n\n// Setup Web Workers\nvar dataWorker = new Worker('/src/data-web-worker.js');\n\nfunction getClientDataWorker() {\n    console.log('Starting Data Fetch');\n    startLoading();\n\n    dataWorker.postMessage({\n        url: 'http://localhost:4000/clients',\n    });\n}\n\ndataWorker.onmessage = function(response) {\n    console.log('Done Data Fetch');\n    finishLoading();\n\n    clients = response.data;\n    activeClients = clients;\n};\n\nvar resultField = document.querySelector('.result');\nvar indicator = document.querySelector('.indicator');\n\nvar renderBtn = document.querySelector('.render');\nvar resetBtn = document.querySelector('.reset');\n\nvar workerStartBtn = document.querySelector('.load-worker');\nvar localStartBtn = document.querySelector('.load-local');\n\nresetBtn.addEventListener('click', function(event) {\n    clear();\n    clients = [];\n    activeClients = clients;\n});\n\nworkerStartBtn.addEventListener('click', function(event) {\n    getClientDataWorker();\n});\n\nlocalStartBtn.addEventListener('click', function(event) {\n    startLoading();\n    Object(_local_client_fetch_js__WEBPACK_IMPORTED_MODULE_0__[\"getClientDataLocal\"])('http://localhost:4000/clients', function(newClients) {\n        clients = newClients;\n        activeClients = clients;\n        finishLoading();\n    });\n});\n\nrenderBtn.addEventListener('click', function(event) {\n    startLoading();\n    renderClientList();\n    finishLoading();\n});\n\n// Helper Functions\n\nfunction startLoading() {\n    indicator.classList.add('indicator-on');\n}\n\nfunction finishLoading() {\n    indicator.classList.remove('indicator-on');\n}\n\nfunction clear() {\n    while (resultField.firstChild) {\n        resultField.removeChild(resultField.firstChild);\n    }\n\n    clients = [];\n    activeClients = clients;\n}\n\nfunction renderClientList() {\n    startLoading();\n\n    activeClients.forEach(function(client) {\n        var clientHtml = `\n            <section class=\"client-item\">\n                <span> ${client.name} </span> --\n                <span> ${client.country} </span> --\n                <span> ${client.id} </span> --\n                <span> $${client.balance} </span>\n            </section>\n        `.trim();\n\n        var htmlWrapper = document.createElement('div');\n        htmlWrapper.innerHTML = clientHtml;\n\n        resultField.appendChild(htmlWrapper.firstChild);\n    });\n\n    setTimeout(function() {\n        finishLoading();\n    }, 0);\n}\n\n//# sourceURL=webpack:///./src/setup-web-worker.js?");

/***/ })

/******/ });