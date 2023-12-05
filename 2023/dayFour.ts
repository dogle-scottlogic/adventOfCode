// https://adventofcode.com/2023/day/4

import * as fs from "fs";

function readData(): string[] {
  const words = fs.readFileSync("data/4-1.txt", "utf-8");
  return words.split("\r\n");
}

export function dayFourPartOne() {
  let sum = 0;
  const cards = readData();
  cards.forEach((card) => {
    sum += getCardPoints(card.split(":")[1].trim(), card.split(":")[0]);
  });
  console.log("Answer: ", sum);
}

function calculatePoints(matches: number): number {
  let result = 1;
  if (matches == 0) {
    return 0;
  } else {
    for (let i = 1; i < matches; i++) {
      result = result * 2;
    }
  }
  return result;
}

function getCardPoints(card: string, cardNum: string): number {
  const [winningNumbers, myNumbers] = card.split("|");
  const winningSet = new Set(winningNumbers.trim().split(/\s+/));
  const matchedNumbers: string[] = [];

  myNumbers
    .trim()
    .split(/\s+/)
    .forEach((number) => {
      if (winningSet.has(number)) {
        matchedNumbers.push(number);
      }
    });
    console.log("Matched numbers: ", cardNum, ":", matchedNumbers);
  return calculatePoints(matchedNumbers.length);
}
