"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function logger() {
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
    }
    console.log.apply(console, args);
}
exports.logger = logger;
