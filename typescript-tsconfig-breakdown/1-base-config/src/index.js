"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Human = /** @class */ (function () {
    function Human(name) {
        this._name = name;
    }
    Human.prototype.speak = function () {
        console.log("Hello, my name is " + this._name);
    };
    return Human;
}());
exports.Human = Human;
