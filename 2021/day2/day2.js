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
const puzzle = __importStar(require("./day2.json"));
const parseInput = () => {
    let input = puzzle.input;
    return input.map((line) => {
        let split = line.split(" ");
        return { direction: split[0], value: parseInt(split[1]) };
    });
};
const calculatePosition = (input) => {
    let aim = 0;
    let horizontalPos = 0;
    let depth = 0;
    input.forEach((movement) => {
        switch (movement.direction) {
            case "up":
                aim -= movement.value;
                break;
            case "down":
                aim += movement.value;
                break;
            case "forward":
                horizontalPos += movement.value;
                depth = depth + (aim * movement.value);
                break;
            default:
                break;
        }
    });
    return horizontalPos * depth;
};
const parsedInput = parseInput();
const answer = calculatePosition(parsedInput);
console.log(`answer is ${answer}`);
