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
const puzzle = __importStar(require("./day3.json"));
const calculateGammaEpsilon = (input) => {
    // Array of 0's the length of the first string in the list
    // Assumes that all strings in list are of equal length
    const tally = Array.from({ length: input[0].length }, x => 0);
    let gammaEpsilon = input.reduce((acc, cur, i, org) => {
        let gamma = [];
        cur.split("").forEach((char, index) => {
            tally[index] += parseInt(char);
            gamma.push(tally[index] > Math.floor(org.length / 2) ? 1 : 0);
        });
        let epsilon = gamma.map(x => x === 0 ? 1 : 0);
        const gDecimal = parseInt(gamma.join(""), 2);
        const eDecimal = parseInt(epsilon.join(""), 2);
        return { gRate: gDecimal, eRate: eDecimal };
    }, { gRate: 0, eRate: 0 });
    return gammaEpsilon;
};
const result = calculateGammaEpsilon(puzzle.input);
const answer = result.gRate * result.eRate;
console.log(result);
console.log(answer);
