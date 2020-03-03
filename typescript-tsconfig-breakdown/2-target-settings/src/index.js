"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Human {
    constructor(name) {
        this._name = name;
    }
    speak() {
        console.log(`Hello, my name is ${this._name}`);
    }
}
exports.Human = Human;
