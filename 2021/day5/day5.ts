import * as puzzle from './test.json'
import * as R from 'ramda'

type Coords = { x: number, y: number };
type Line = [Coords, Coords];

function parseInput(): Array<Line> {
    const lines: Array<Line> = [];
    const input: string = puzzle.input;
    const rawLines = input.split(/\n/);
    rawLines.forEach(rawLine => {
        const coordsRaw = rawLine.split(" -> ");
        const line: Line = coordsRaw.map((coord): Coords => {
            const xy = coord.split(",");
            return {
                x: parseInt(xy[0]),
                y: parseInt(xy[1])
            }
        }) as Line;
        lines.push(line);
    })
    return lines;
}

function printMap(map: { [key: string]: number }) {
    for (const [key, value] of Object.entries(map)) {
        console.log(`${key}: ${value}`);
    }
}

function mapCoords(lineMap: Array<Line>): { [key: string]: number } {
    // Setup map
    let map: { [key: string]: number } = {};

    const getNewValue = (origin: number | undefined): number => {
        return origin == null ? 1 : origin + 1;
    }

    const traverseLine = (currentCoords: Coords, endCoords: Coords, map: { [key: string]: number }): { [key: string]: number } => {
        const newMap = R.clone(map);
        const key = `${currentCoords.x}:${currentCoords.y}`;
        newMap[key] = getNewValue(newMap[key]);

        if (currentCoords.x === endCoords.x && currentCoords.y === endCoords.y) {
            return newMap;
        }

        const newCoords = currentCoords;
        if (newCoords.x < endCoords.x) {
            newCoords.x++;
        }
        if (newCoords.x > endCoords.x) {
            newCoords.x--;
        }
        if (newCoords.y < endCoords.y) {
            newCoords.y++;
        }
        if (newCoords.y > endCoords.y) {
            newCoords.y--;
        }

        return traverseLine(newCoords, endCoords, newMap);
    }

    lineMap.forEach(line => {
        // console.log("line : " + line[0].x + ":" + line[0].y + " -> " + line[1].x + ":" + line[1].y);
        // if hor or ver
        if (line[0].x === line[1].x || line[0].y === line[1].y) {
            map = traverseLine(line[0], line[1], map);
            // printMap(map);
        }
    });
    return map;
}

function calcResult(map: { [key: string]: number }): number {
    let count = 0;

    for (const value of Object.values(map)) {
        if (value != null && value > 1) {
            count++;
        }
    }

    return count;
}

function optimum(lines: Array<Line>) {
    const compareByFirstX = (a: Line, b: Line) => {
        const lesserA = Math.min(a[0].x, a[1].x);
        const lesserB = Math.min(b[0].x, b[1].x);
        return lesserA < lesserB ? -1 : 1;
    }

    const compareByFirstY = (a: Line, b: Line) => {
        const lesserA = Math.min(a[0].y, a[1].y);
        const lesserB = Math.min(b[0].y, b[1].y);
        return lesserA < lesserB ? -1 : 1;
    }

    let count = 0
    let changeInX = lines.filter(l => l[0].x !== l[1].x && l[0].y === l[1].y);
    let changeInY = lines.filter(l => l[0].y !== l[1].y && l[0].x === l[1].x);
    changeInX = changeInX.sort(compareByFirstX);
    changeInY = changeInY.sort(compareByFirstY);

    changeInX.forEach((xLine, i) => {
        const lesserX = Math.min(xLine[0].x, xLine[1].x);
        const maxX = Math.max(xLine[0].x, xLine[1].x);

        if (i + 1 < changeInX.length && xLine[0].y === changeInX[i + 1][0].y) {
            const nextLesserX = Math.min(changeInX[i + 1][0].x, changeInX[i + 1][1].x)
            const nextMaxX = Math.max(changeInX[i + 1][0].x, changeInX[i + 1][1].x)
            if (maxX >= nextLesserX) {
                console.log(`x line: ${xLine[0].x}, ${xLine[0].y} -> ${xLine[1].x}, ${xLine[1].y}`)
                console.log(`next x line: ${changeInX[i + 1][0].x}, ${changeInX[i + 1][0].y} -> ${changeInX[i + 1][1].x}, ${changeInX[i + 1][1].y}`)
                // console.log(`y line: ${yLine[0].x}, ${yLine[0].y} -> ${yLine[1].x}, ${yLine[1].y}`)

                const endX = Math.min(maxX, nextMaxX);
                //
                count += endX - nextLesserX + 1;
                console.log(maxX, endX, count, nextLesserX);
            }
        }

        changeInY.forEach(yLine => {
            const lesserY = Math.min(yLine[0].y, yLine[1].y);
            const maxY = Math.min(yLine[0].y, yLine[1].y);
            // yLine x between xLine range and xLine y between yLine range
            if (
                (yLine[0].x >= lesserX && yLine[0].x <= maxX) &&
                (xLine[0].y >= lesserY && xLine[0].y <= maxY)
            ) {
                console.log(`x line: ${xLine[0].x}, ${xLine[0].y} -> ${xLine[1].x}, ${xLine[1].y}`)
                console.log(`y line: ${yLine[0].x}, ${yLine[0].y} -> ${yLine[1].x}, ${yLine[1].y}`)
                count++;
            }
        });
    });
    return count;
}

const results = parseInput();
// const map = mapCoords(results);
// const answer = calcResult(map);
const answer = optimum(results);
console.log(answer)