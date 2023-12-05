// https://adventofcode.com/2023/day/3

import * as fs from "fs";

function readData(): string[] {
  const words = fs.readFileSync("data/3-1.txt", "utf-8");
  return words.split("\r\n");
}

interface PartNumberSpec {
  partNo: number;
  rowIndex: number;
  startColIndex: number;
  endColIndex: number;
}

const getPartNumberSpec = (
  row: string,
  startIndex: number,
  rowIndex: number
): PartNumberSpec => {
  let partNo = (row.slice(startIndex).match(/\d+/) as string[])[0];
  return {
    partNo: Number(partNo),
    rowIndex,
    startColIndex: startIndex,
    endColIndex: startIndex + partNo.length - 1,
  };
};

export function dayThreePartOne() {
  let sum = 0;
  let currentValue = null;
  let previousValue = null;
  const map = readData();
  const isNumber = (value: unknown): value is number =>
    value != null && Number.isInteger(Number(value));

  const isPartNumber = (
    rowSnippet: string[],
    spec: PartNumberSpec
  ): boolean => {
    var symbolRegex = /[^A-Za-z 0-9]/g;
    // rowSnippet is previous, current and next row.
    const prevRow: string | undefined = rowSnippet[0];
    const row = rowSnippet[1];
    const nextRow = rowSnippet[2];
    const firstInRow = spec.startColIndex == 0;
    const lastInRow = spec.endColIndex == row.length - 1;
    const isSymbol = (char: string) => char != "." && symbolRegex.test(char);
    const l = firstInRow ? false : isSymbol(row[spec.startColIndex - 1]);
    const tl =
      firstInRow || !prevRow
        ? false
        : isSymbol(prevRow[spec.startColIndex - 1]);
    const t = prevRow
      ? Array.from(prevRow).reduce((p, c, i) => {
          if (i >= spec.startColIndex && i <= spec.endColIndex) {
            return p || isSymbol(c);
          }
          return p;
        }, false)
      : false;
    const tr =
      lastInRow || !prevRow ? false : isSymbol(prevRow[spec.endColIndex + 1]);
    const r = lastInRow ? false : isSymbol(row[spec.endColIndex + 1]);
    const br =
      lastInRow || !nextRow ? false : isSymbol(nextRow[spec.endColIndex + 1]);
    const b = nextRow
      ? Array.from(nextRow).reduce((p, c, i) => {
          if (i >= spec.startColIndex && i <= spec.endColIndex) {
            return p || isSymbol(c);
          }
          return p;
        }, false)
      : false;
    const bl =
      firstInRow || !nextRow
        ? false
        : isSymbol(nextRow[spec.startColIndex - 1]);

    // if (spec.partNo === 617) {
    //     console.log(l, tl, t, tr, r, br, b, bl);
    // }

    return l || tl || t || tr || r || br || b || bl;
  };

  // walk the map
  for (let rowIndex = 0; rowIndex < map.length; rowIndex++) {
    for (let colIndex = 0; colIndex < map[rowIndex].length; colIndex++) {
      currentValue = map[rowIndex][colIndex];
      if (isNumber(currentValue) && !isNumber(previousValue)) {
        const spec = getPartNumberSpec(map[rowIndex], colIndex, rowIndex);
        if (
          isPartNumber(
            [map[rowIndex - 1], map[rowIndex], map[rowIndex + 1]],
            spec
          )
        ) {
          sum += spec.partNo;
        }
      }
      previousValue = currentValue;
    }
  }
  console.log("Answer: ", sum);
}

function getGearRatio(
  gearRowIndex: number,
  gearColIndex: number,
  map: string[]
): number {
  const isNumber = (value: unknown): value is number =>
    value != null && Number.isInteger(Number(value));
  const findStartCoords = (r: number, c: number): number[] => {
    if (!isNumber(map[r][c])) {
      return [r, c + 1];
    }
    return findStartCoords(r, c - 1);
  };
  let seenCoors: string[] = [];
  const parts = [];
  const tl = [gearRowIndex - 1, gearColIndex - 1];
  const t = [gearRowIndex - 1, gearColIndex];
  const tr = [gearRowIndex - 1, gearColIndex + 1];
  const l = [gearRowIndex, gearColIndex - 1];
  const r = [gearRowIndex, gearColIndex + 1];
  const br = [gearRowIndex + 1, gearColIndex + 1];
  const b = [gearRowIndex + 1, gearColIndex];
  const bl = [gearRowIndex + 1, gearColIndex - 1];
  const checks = [tl, t, tr, r, br, b, bl, l];

  // For each surounding coord
  for (let i = 0; i < checks.length; i++) {
    const rowIndex = checks[i][0];
    const colIndex = checks[i][1];
    // If a number is found that hasn't been checked
    console.log("Checking r:", rowIndex, " c:", colIndex);
    if (isNumber(map[rowIndex][colIndex]) && !seenCoors.some(seen => seen === `${rowIndex}:${colIndex}`)) {
      console.log(map[rowIndex][colIndex], " is a number that has not been seen");
      const startNumberCoords = findStartCoords(rowIndex, colIndex);
      const spec = getPartNumberSpec(
        map[rowIndex],
        startNumberCoords[1],
        startNumberCoords[0]
      );
      for (
        let j = startNumberCoords[1];
        j < startNumberCoords[1] + spec.partNo.toString().length;
        j++
      ) {
        seenCoors.push(`${startNumberCoords[0]}:${j}`);
      }
      parts.push(spec.partNo);
    }
  }

  if (parts.length == 2) {
    return parts[0] * parts[1];
  }

  return 0;
}

export function dayThreePartTwo() {
  let sum = 0;
  let currentValue = null;
  let previousValue = null;
  const map = readData();
  // walk the map
  for (let rowIndex = 0; rowIndex < map.length; rowIndex++) {
    for (let colIndex = 0; colIndex < map[rowIndex].length; colIndex++) {
      currentValue = map[rowIndex][colIndex];
      if (currentValue === "*") {
        const gr = getGearRatio(rowIndex, colIndex, map);
        sum+= gr;
      }
      previousValue = currentValue;
    }
  }
  console.log("Answer: ", sum);
}
