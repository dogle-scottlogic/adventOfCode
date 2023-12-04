// https://adventofcode.com/2023/day/1

import * as fs from 'fs';

function readData() {
    const words = fs.readFileSync('data/1-1.txt', 'utf-8');
    return words.split('\r\n');
}

export function dayOnePartOne() {
    const data = readData();
    const answer = data.reduce((p, c) => {
        // Strip non-numberic chars
        c = c.replace(/\D/g,'');
        return p + Number(`${c.slice(0, 1)}${c.slice(-1)}`)
    }, 0);
    console.log(answer);
}

export function dayOnePartTwo() {
    const days = ["one", "two", "three", "four", "five", "six", "seven", "eight", "nine"];

    const findFirst = (line: string):string => {
        if (Number.isInteger(Number(line.charAt(0)))) {
            return line.charAt(0)
        }
        const firstNumString = days.find(day => line.startsWith(day));
        if (firstNumString) {
            return String(days.indexOf(firstNumString) + 1);
        }
        return findFirst(line.slice(1));
    }

    const findLast = (line: string):string => {
        if (Number.isInteger(Number(line.charAt(line.length -1)))) {
            return line.charAt(line.length - 1)
        }
        const lastNumString = days.find(day => line.endsWith(day));
        if (lastNumString) {
            return String(days.indexOf(lastNumString) + 1);
        }
        return findLast(line.substring(0, line.length - 1));
    }

    const data = readData();
    const answer = data.reduce((p, c) => {
        const firstNum = findFirst(c);
        const lastNum = findLast(c);
        return p + Number(`${firstNum}${lastNum}`)
    }, 0);
    console.log(answer);
}