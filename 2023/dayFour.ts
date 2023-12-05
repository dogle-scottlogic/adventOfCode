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
    const points = getCardPoints(card.split(":")[1].trim(), card.split(":")[0]);
    sum += calculatePoints(points.length);
  });
  console.log("Answer: ", sum);
}

export function dayFourPartTwo() {
  const cards = readData();
  let wonCardCount = 0;
  const cachedPoints: { [x: string]: string[] } = {};
  const cardCountMap: { [x: string]: number } = cards.reduce((c, p) => {
    c[p] = 1;
    return c;
  }, {} as { [x: string]: number });
  for (let i = 0; i < cards.length; i++) {
    console.log("Current card: ", cards[i]);
    const card = cards[i];
    const numberOfInstances = cardCountMap[card];
    let points: string[] = cachedPoints[card];
    if (points == null) {
      points = getCardPoints(card.split(":")[1].trim(), card.split(":")[0]);
      cachedPoints[card] = points;
    }
    for (
      let pointIndex = i + 1;
      pointIndex < i + 1 + points.length;
      pointIndex++
    ) {
      cardCountMap[cards[pointIndex]] += numberOfInstances;
    }
  }

  for (const [_, value] of Object.entries(cardCountMap)) {
    wonCardCount += value;
  }
  console.log("Answer: ", wonCardCount);
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

function getCardPoints(card: string, cardNum: string) {
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
  return matchedNumbers;
}
