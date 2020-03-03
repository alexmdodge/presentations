"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var logger_js_1 = require("./logger.js");
require("./map-polyfill.js");
var Human = /** @class */ (function () {
    function Human(name) {
        this._name = name;
    }
    Human.prototype.speak = function () {
        var brokenWords = new Map();
        brokenWords.set('first', 'Hello, my');
        brokenWords.set('second', ' name is ');
        brokenWords.set('third', this._name);
        brokenWords.forEach(function (word) { return logger_js_1.logger(word); });
    };
    return Human;
}());
exports.Human = Human;
