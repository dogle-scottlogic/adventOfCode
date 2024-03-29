// https://adventofcode.com/2023/day/6

import * as fs from "fs";

function readData() {
  const words = fs.readFileSync("data/6-1.txt", "utf-8");
  return words.split("\r\n");
}

export function daySixPartOne() {
    let sum = 1;
    const data = readData();
    const times = data[0].split("Time:")[1].trim().split(/\s+/).map(x => Number(x));
    const distances = data[1].split("Distance:")[1].trim().split(/\s+/).map(x => Number(x));
    times.forEach((time, i) => {
        const wins = calculateWaysToWin(time, distances[i]);
        sum = sum * wins.length;
    });
    console.log("Result:", sum)
}

export function daySixPartTwo() {
    const data = readData();
    const time = Number(data[0].split("Time:")[1].replace(/\s+/g, ""));
    const distance = Number(data[1].split("Distance:")[1].replace(/\s+/g, ""));
    const wins = calculateWaysToWinOptimal(time, distance);
    console.log("Result:", wins)
}

function calculateWaysToWin(time: number, recordDistance: number): number[] {
    const winningTimes = [];
    // 0 is always 0
    // hold for total time is always 0
    for (let holdTime = 1; holdTime < time; holdTime++) {
        // holdTime mps
        const timeLeftToMove = time - holdTime;
        const raceTime = (holdTime * timeLeftToMove);        
        if (raceTime > recordDistance) {
            winningTimes.push(raceTime);
        }
    }

    return winningTimes;
}

/**
 * Could be better - don't really need to keep going after a certain point but this works
 * @param time 
 * @param recordDistance 
 * @returns 
 */
function calculateWaysToWinOptimal(time: number, recordDistance: number): number {
    let waysToWin = 0;
    // 0 is always 0
    // hold for total time is always 0
    for (let holdTime = 1; holdTime < time; holdTime++) {
        // holdTime mps
        const timeLeftToMove = time - holdTime;
        const raceTime = (holdTime * timeLeftToMove);        
        if (raceTime > recordDistance) {
            waysToWin++;
        }
    }

    return waysToWin;
}