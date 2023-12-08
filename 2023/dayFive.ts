// https://adventofcode.com/2023/day/5

import * as fs from "fs";

function readData(): { [key: string]: string[] } {
  const data: { [key: string]: string[] } = {};
  const words = fs.readFileSync("data/5-1.txt", "utf-8");
  const parts = words.split(/\n\s*\n/);
  parts.forEach((part) => {
    const keys = part.split(":");
    data[keys[0].replace(" map", "")] = keys[1]
      .replace(/(\n)/gm, "")
      .split(/\r/gm)
      .filter((x) => x !== "")
      .map((x) => x.trim());
  });
  return data;
}

export class RangeMapping {
  ranges: {
    destinationRangeStart: number;
    sourceRangeStart: number;
    destinationRangeEnd: number;
    sourceRangeEnd: number;
    rangeLength: number;
  }[];

  constructor(mapping: string[]) {
    this.ranges = [];
    mapping.forEach((range) => {
      const parts = range.split(/\s+/);
      const destinationRangeStart = Number(parts[0]);
      const sourceRangeStart = Number(parts[1]);
      const rangeLength = Number(parts[2]);
      this.ranges.push({
        destinationRangeStart,
        destinationRangeEnd: destinationRangeStart + rangeLength,
        sourceRangeStart,
        sourceRangeEnd: sourceRangeStart + rangeLength,
        rangeLength,
      });
    });
  }

  getMapping(value: number) {
    const range = this.ranges.find(
      (range) =>
        value >= range.sourceRangeStart && value <= range.sourceRangeEnd
    );
    if (range) {
      const offset = range.sourceRangeStart - range.destinationRangeStart;
      return value - offset;
    } else {
      return value;
    }
  }
}

export function dayFivePartOne() {
  console.log("Day five part 1:");
  const data = readData();
  const seeds: number[] = data["seeds"][0].split(" ").map((x) => Number(x));
  const seedToSoilMap = getMap(data["seed-to-soil"]);
  const soilToFertilizerMap = getMap(data["soil-to-fertilizer"]);
  const fertilizerToWaterMap = getMap(data["fertilizer-to-water"]);
  const waterToLightMap = getMap(data["water-to-light"]);
  const lightToTempMap = getMap(data["light-to-temperature"]);
  const tempToHumidity = getMap(data["temperature-to-humidity"]);
  const humidityToLocation = getMap(data["humidity-to-location"]);

  const chain = [
    seedToSoilMap,
    soilToFertilizerMap,
    fertilizerToWaterMap,
    waterToLightMap,
    lightToTempMap,
    tempToHumidity,
    humidityToLocation,
  ];
  let inputOutput = seeds;
  const testKey = [
    "soil",
    "fert",
    "water",
    "light",
    "temp",
    "humid",
    "location",
  ];
  chain.forEach((mapping, i) => {
    inputOutput = getDestinationFromSource(inputOutput, mapping);
    console.log(i, ":Output ", testKey[i], ":", inputOutput);
  });

  const result = inputOutput.reduce((c, p) => {
    return p < c ? p : c;
  });
  console.log(result);
}

export function dayFivePartTwo() {
  console.log("Day five part 2:");
  const data = readData();
  const seeds = getSeeds(data["seeds"][0]);
  const seedToSoilMap = getMap(data["seed-to-soil"]);
  const soilToFertilizerMap = getMap(data["soil-to-fertilizer"]);
  const fertilizerToWaterMap = getMap(data["fertilizer-to-water"]);
  const waterToLightMap = getMap(data["water-to-light"]);
  const lightToTempMap = getMap(data["light-to-temperature"]);
  const tempToHumidity = getMap(data["temperature-to-humidity"]);
  const humidityToLocation = getMap(data["humidity-to-location"]);
  let inputOutput = seeds;
  const chain = [
    seedToSoilMap,
    soilToFertilizerMap,
    fertilizerToWaterMap,
    waterToLightMap,
    lightToTempMap,
    tempToHumidity,
    humidityToLocation,
  ];
  const testKey = [
    "soil",
    "fert",
    "water",
    "light",
    "temp",
    "humid",
    "location",
  ];

  chain.forEach((mapping, i) => {
    inputOutput = getRangesFromMap(inputOutput, mapping);
    console.log(i, ":Output ", testKey[i], ":", inputOutput);
  });

  console.log(
    "Result: ",
    inputOutput.reduce((c, p) => {
      if (Number(p.split(":")[0]) < c || c === -1) {
        return Number(p.split(":")[0]);
      }
      return c;
    }, -1)
  );
}

function getSeeds(seeds: string) {
  console.log(seeds);
  return seeds.split(" ").reduce((c, p, i, a) => {
    if (i % 2 === 0) {
      c.push(`${p}:${a[i + 1]}`);
      return c;
    }
    return c;
  }, [] as string[]);
}

/**
 * Takes an array of ranges - ["12:14", "13:50"];
 * Returns an array of ranges that describes all posible ranges of output from passing the input range through the map.
 * @param input
 * @param map
 */
export function getRangesFromMap(inputRanges: string[], map: RangeMapping) {
  const mapRanges = map.ranges;
  const newRanges: string[] = [];
  inputRanges.forEach((range) => {
    let rangeParts = range.split(":");
    let currentIndex = Number(rangeParts[0]);
    let startOfRange = currentIndex;
    const lastIndex = Number(rangeParts[0]) + Number(rangeParts[1]) - 1;
    while (currentIndex < lastIndex) {
      const mappingForIndex = mapRanges.find(
        (r) =>
          r.sourceRangeStart <= currentIndex && r.sourceRangeEnd > currentIndex
      );
      if (mappingForIndex) {
        const offset =
          mappingForIndex.destinationRangeStart -
          mappingForIndex.sourceRangeStart;
        startOfRange = currentIndex + offset;
        const endOfRange =
          mappingForIndex.sourceRangeEnd < lastIndex
            ? mappingForIndex.destinationRangeEnd
            : lastIndex + offset;
        newRanges.push(
          `${startOfRange}:${Math.abs(endOfRange - startOfRange) + 1}`
        );
        currentIndex = endOfRange - offset;
      } else {
        startOfRange = currentIndex;
        const nextRangeStart: number = mapRanges.reduce((c, p) => {
          if (
            p.sourceRangeStart > currentIndex &&
            (c == -1 || c > p.sourceRangeStart)
          ) {
            return p.sourceRangeStart;
          }
          return c;
        }, -1);
        const endOfRange =
          nextRangeStart > -1 && nextRangeStart < lastIndex
            ? nextRangeStart - 1
            : lastIndex;
        mapRanges.find((r) => r.sourceRangeStart > currentIndex)
          ?.sourceRangeStart ?? lastIndex;
        newRanges.push(`${startOfRange}:${endOfRange - startOfRange + 1}`);
        currentIndex = endOfRange + 1;
      }
    }
  });
  return newRanges;
}

function getDestinationFromSource(
  source: number[],
  map: RangeMapping
): number[] {
  const destination: number[] = [];
  source.forEach((item) => {
    destination.push(map.getMapping(item));
  });
  return destination;
}

/**
 * Return a map of a to b numbers where there are given ranges
 */
function getMap(mapping: string[]): RangeMapping {
  return new RangeMapping(mapping);
}
