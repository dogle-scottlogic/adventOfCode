// https://adventofcode.com/2023/day/8

import * as fs from "fs";

function readData() {
  const words = fs.readFileSync("data/8-1.txt", "utf-8");
  return words.split("\r\n");
}

function parseData(): {
  rlInstruction: string[];
  firstInstruction: string;
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
  return { rlInstruction, firstInstruction, map };
}

export function dayEightPartOne() {
  const { rlInstruction, map } = parseData();

  let currentNode = "AAA";
  let count = 0;
  let instuctionIndex = 0;
  
  while (currentNode !== "ZZZ") {
    const instruction = rlInstruction[instuctionIndex];
    currentNode = instruction === "L" ? map[currentNode][0] : map[currentNode][1];
    instuctionIndex = (instuctionIndex + 1) % rlInstruction.length;
    count++;
  }

  console.log(count);
}
