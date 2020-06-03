"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.range = void 0;
exports.range = (size, start = 0) => {
    return [...Array(size).keys()].map(k => k + start);
};
