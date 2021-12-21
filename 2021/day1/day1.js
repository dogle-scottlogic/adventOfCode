"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const puzzle = __importStar(require("./day1.json"));
let input = puzzle.input;
// Part Two
let windows = input.reduce((acc, current, i, arr) => {
    if (i > 1) {
        acc.push(arr[i - 2] + arr[i - 1] + arr[i]);
        return acc;
    }
    return [];
}, []);
let resultOne = 0;
windows.forEach((val, i, arr) => {
    if (i !== 0) {
        const prevMeasure = arr[i - 1];
        if (prevMeasure < arr[i]) {
            resultOne++;
        }
    }
});
console.log(resultOne);
// console.log(windows)
