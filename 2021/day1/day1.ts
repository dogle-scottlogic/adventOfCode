import * as puzzle from './day1.json'

let input = puzzle.input as number[];

// Part Two
let windows = input.reduce((acc: number[], current: number, i: number, arr: number[]) => {
    if (i > 1) {
        acc.push(arr[i - 2] + arr[i - 1] + arr[i])
        return acc;
    }
    return [];
}, [])

let resultOne = 0
windows.forEach((val: number, i: number, arr: number[]) => {
    if (i !== 0) {
        const prevMeasure = arr[i - 1];
        if (prevMeasure < arr[i]) {
            resultOne++;
        }
    }
})

console.log(resultOne);

// console.log(windows)