// https://adventofcode.com/2023/day/8

import * as fs from "fs";

/**
 * Returns the greatest common denominator of the two values.
 * @param {number} a
 * @param {number} b
 */
export const greatestCommonDenominator = (a: number, b: number): number =>
  b === 0 ? a : greatestCommonDenominator(b, a % b);

/**
 * Computes the least common multiple between the two numbers
 * @param {number} a
 * @param {number} b
 */
const computeLM = (a: number, b: number) =>
  (a * b) / greatestCommonDenominator(a, b);

/**
 * Computes the least common multiple between the numbers.
 * @param {...number} numbers
 */
export const lcm = (...numbers: number[]) => {
  if (numbers.length < 2) {
    throw new RangeError("need at least two numbers");
  }
  return numbers.reduce((acc, x) => computeLM(acc, x), 1);
};

function readData() {
  const words = fs.readFileSync("data/8-1.txt", "utf-8");
  return words.split("\r\n");
}

function parseData(): {
  rlInstruction: string[];
  map: { [key: string]: string[] };
} {
  const data = readData();
  const [rl, _, ...instructions] = data;
  const firstInstruction = instructions[0].substring(
    0,
    instructions[0].indexOf(" ")
  );
  const map = instructions.reduce((c, p) => {
    const parts = p.split(" = ");
    const key = parts[0];
    c[key] = parts[1]
      .replace(/\(|\)/g, "")
      .split(",")
      .map((x) => x.trim());
    return c;
  }, {} as { [key: string]: string[] });
  const rlInstruction = Array.from(rl);
  return { rlInstruction, map };
}

function getNumberOfSteps(
  currentNode: string,
  data: {
    rlInstruction: string[];
    map: {
      [key: string]: string[];
    };
  },
  endCondition: (x: string) => boolean
): number {
  const { rlInstruction, map } = data;
  let count = 0;
  let instuctionIndex = 0;

  while (!endCondition(currentNode)) {
    const instruction = rlInstruction[instuctionIndex];
    currentNode =
      instruction === "L" ? map[currentNode][0] : map[currentNode][1];
    instuctionIndex = (instuctionIndex + 1) % rlInstruction.length;
    count++;
  }
  return count;
}

export function dayEightPartOne() {
  const data = parseData();
  const currentNode = "AAA";
  let count = getNumberOfSteps(
    currentNode,
    data,
    (currentNode) => currentNode === "ZZZ"
  );

  console.log(count);
}

export function dayEightPartTwo() {
  const data = parseData();
  const startingNodes = Object.keys(data.map).filter((k) => k.endsWith("A"));
  const endCounts = startingNodes.map((startNode) =>
    getNumberOfSteps(startNode, data, (node) => node.endsWith("Z"))
  );
  console.log(lcm(...endCounts));
}
