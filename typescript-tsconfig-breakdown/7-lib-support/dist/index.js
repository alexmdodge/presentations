"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Human = /** @class */ (function () {
    function Human(name) {
        this._name = name;
    }
    Human.prototype.speak = function () {
        var brokenWords = new Map();
        brokenWords.set('first', 'Hello, my');
        brokenWords.set('second', ' name is ');
        brokenWords.set('third', this._name);
        brokenWords.forEach(function (word) { return console.log(word); });
    };
    return Human;
}());
exports.Human = Human;
