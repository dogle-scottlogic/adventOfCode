// https://adventofcode.com/2023/day/11

import * as fs from "fs";

function readData() {
  const words = fs.readFileSync("data/11-1.txt", "utf-8");
  return words.split("\r\n");
}

type Map = string[][];

export function dayElevenPartOne() {
  const universe = readData();
  const galaxyDetails = getGalaxyLocations(universe);
  const galaxyLocations = adjustForInflation(galaxyDetails);
  const shortestPaths = getShortestPaths(galaxyLocations);
  console.log(shortestPaths.reduce((c, p) => c + p, 0));
}

export function dayElevenPartTwo() {
  const universe = readData();
  const galaxyDetails = getGalaxyLocations(universe);
  const galaxyLocations = adjustForInflation({
    ...galaxyDetails,
    expansionValue: 1000000,
  });
  const shortestPaths = getShortestPaths(galaxyLocations);
  console.log(shortestPaths.reduce((c, p) => c + p, 0));
}

function adjustForInflation(galaxyDetails: {
  galaxyLocations: { rowIndex: number; colIndex: number }[];
  colsWithNoGalaxy: number[];
  rowsWithNoGalaxy: number[];
  expansionValue?: number;
}) {
  let { galaxyLocations, colsWithNoGalaxy, rowsWithNoGalaxy, expansionValue } =
    galaxyDetails;
  let ev = expansionValue ? expansionValue - 1 : 1;
  galaxyLocations = galaxyLocations.map((gl) => {
    const colOffset = colsWithNoGalaxy.reduce((c, p) => {
      return gl.colIndex > p ? c + ev : c;
    }, 0);

    const rowOffset = rowsWithNoGalaxy.reduce((c, p) => {
      return gl.rowIndex > p ? c + ev : c;
    }, 0);
    return {
      colIndex: gl.colIndex + (colOffset),
      rowIndex: gl.rowIndex + (rowOffset),
    };
  });
  return galaxyLocations;
}

function getShortestPaths(
  galaxyLocations: {
    rowIndex: number;
    colIndex: number;
  }[]
) {
  let shortestPaths = [];
  let count = 0;
  for (let i = 0; i < galaxyLocations.length; i++) {
    for (let j = i + 1; j < galaxyLocations.length; j++) {
      if (i !== j) {
        count++;
        shortestPaths.push(
          Math.abs(galaxyLocations[i].colIndex - galaxyLocations[j].colIndex) +
            Math.abs(galaxyLocations[i].rowIndex - galaxyLocations[j].rowIndex)
        );
      }
    }
  }
  return shortestPaths;
}

function getGalaxyLocations(universe: string[]): {
  galaxyLocations: { rowIndex: number; colIndex: number }[];
  colsWithNoGalaxy: number[];
  rowsWithNoGalaxy: number[];
} {
  let galaxyLocations: { rowIndex: number; colIndex: number }[] = [];
  // Find all cols with a galaxy
  const colsWithGalaxy = new Set();
  // Find all cols with a galaxy
  for (let rowIndex = 0; rowIndex < universe.length; rowIndex++) {
    for (let colIndex = 0; colIndex < universe[0].length; colIndex++) {
      if (universe[rowIndex][colIndex] === "#") {
        galaxyLocations.push({ colIndex, rowIndex });
        colsWithGalaxy.add(colIndex);
      }
    }
  }

  const colsWithNoGalaxy = [...Array(universe[0].length).keys()].filter(
    (x) => !colsWithGalaxy.has(x)
  );

  const rowsWithNoGalaxy: number[] = [];
  universe.forEach((row, i) => {
    if (Array.from(row).every((r) => r === ".")) {
      rowsWithNoGalaxy.push(i);
    }
  });

  return { galaxyLocations, colsWithNoGalaxy, rowsWithNoGalaxy };
}
