// https://adventofcode.com/2023/day/9

import * as fs from "fs";

function readData() {
  const words = fs.readFileSync("data/9-1.txt", "utf-8");
  return words.split("\r\n");
}

export function dayNinePartOne() {
  const data = readData();
  const histories = data.map((line) =>
    line.split(" ").map((x: string) => Number(x))
  );
  const results = histories.map(calculateHistory);
  console.log(results.reduce((c,p) => c + p));
}

export function dayNinePartTwo() {
    const data = readData();
    const histories = data.map((line) =>
      line.split(" ").map((x: string) => Number(x))
    );
    const results = histories.map(calculatePreviousHistory);
    console.log(results.reduce((c,p) => c + p));
}

function calculateSequences(history: number[]): number[][] {
  const sequences = [history];
  let currentSequence = history;
  while (currentSequence.some((value) => value !== 0)) {
    const nextSequence: number[] = [];
    currentSequence.forEach((value, i) => {
      if (i != 0) {
        nextSequence.push(value - currentSequence[i - 1]);
      }
    });

    sequences.push(nextSequence);
    currentSequence = nextSequence;
  }
  return sequences;
}

function calculateHistory(history: number[]): number {
  const sequences = calculateSequences(history);
  // Extrapolate
  // Add a zero to the last list;
  sequences[sequences.length - 1].push(0);
  for (let i = sequences.length - 2; i >= 0; i--) {
    sequences[i].push(
      sequences[i][sequences[i].length - 1] +
        sequences[i + 1][sequences[i + 1].length - 1]
    );
  }
  return sequences[0][sequences[0].length - 1];
}

function calculatePreviousHistory(history: number[]): number {
    const sequences = calculateSequences(history);
    // Extrapolate
    // Add a zero to the last list;
    sequences[sequences.length - 1].unshift(0);
    for (let i = sequences.length - 2; i >= 0; i--) {
      sequences[i].unshift(
        sequences[i][0] -
          sequences[i + 1][0]
      );
    }
    return sequences[0][0];
  }
