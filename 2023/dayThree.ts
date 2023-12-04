// https://adventofcode.com/2023/day/3

import * as fs from "fs";

function readData(): string[] {
  const words = fs.readFileSync("data/3-1.txt", "utf-8");
  return words.split("\r\n");
}

export function dayThreePartOne() {
  let sum = 0;
  let currentValue = null;
  let previousValue = null;
  const map = readData();
  const isNumber = (value: unknown): value is number =>
    value != null && Number.isInteger(Number(value));

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

    // Following consts are true if a symbol is found
    // if(spec.partNo === 617) {
    //     console.log(spec);
    //     console.log("lir: ", lastInRow);
    //     console.log(row[spec.endColIndex + 1]);
    // }
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
            sum+=spec.partNo;
        }
      }
      previousValue = currentValue;
    }
  }
  console.log("Answer: ", sum);
}
