import * as puzzle from './day4.json'

type Grid = Array<Array<string>>;
type Coords = { rIndex: number, cIndex: number };
const gridArray = puzzle.grids.split(/\n\n/);
let grids: Array<Grid> = gridArray.map((grid) => grid.split(/\n/).map(row => row.trim().split(/\s+/)));

type ScoreCard = {
    gridResults: Array<{ rows: Array<number>, cols: Array<number> }>,
    winningIndexes: Array<number>;
}

let scoreCard: ScoreCard = {
    gridResults: Array.from({length: grids.length}, x => ({
        // assume always a 5 x 5 grid for now
        rows: [0, 0, 0, 0, 0],
        cols: [0, 0, 0, 0, 0]
    })),
    winningIndexes: []
}

const gridReduce = <T, R>(grid: Array<Array<T>>, reduce: (accumulator: R, cellValue: T, cellCoords: Coords) => R, initValue: R): R => {
    // for each row
    let acc = initValue;
    grid.forEach(((row, rIndex) => {
        row.forEach(((cell, cIndex) => {
            acc = reduce(acc, cell, {rIndex, cIndex});
        }));
    }));
    return acc;
}

function checkGrids(grids: Array<Grid>, draw: number, scoreCard: ScoreCard): ScoreCard {
    let winningIndexes: Array<number> = [];
    // init the results with the default for each grid in the input
    grids.forEach((grid: Grid, gridIndex: number) => {
        const matchingCoords = gridReduce<string, Coords | null>(grid, (acc, cellValue, cellCoords) => {
            return parseInt(cellValue) === draw ? cellCoords : acc;
        }, null);

        if (matchingCoords) {
            // when a number matches increment the col and row in the gridResults.
            // mark the number by adding an x to the end
            const updatedResultsGrid = scoreCard.gridResults[gridIndex];
            updatedResultsGrid.rows[matchingCoords.rIndex]++;
            updatedResultsGrid.cols[matchingCoords.cIndex]++;
            scoreCard.gridResults[gridIndex] = updatedResultsGrid;
            grids[gridIndex][matchingCoords.rIndex][matchingCoords.cIndex] =
                "x" + grids[gridIndex][matchingCoords.rIndex][matchingCoords.cIndex];

            if (
                updatedResultsGrid.rows[matchingCoords.rIndex] === 5 ||
                updatedResultsGrid.cols[matchingCoords.cIndex] === 5
            ) {
                console.log("Grid number " + gridIndex + " has won at draw " + draw);
                winningIndexes.push(gridIndex);
            }
        }
    })
    return {
        gridResults: scoreCard.gridResults,
        winningIndexes
    };
}

function calculateScore(winningGrid: Grid): number {
    const sum = gridReduce(winningGrid, (acc, cur) => {
        return cur.charAt(0) === 'x' ? acc : acc += parseInt(cur)
    }, 0);
    return sum;
}

function playBingo(draw: Array<number>): Array<{ winningGridIndex: number, winningGridResult: number, currentDraw: number }> | null {
    for (const d of draw) {
        scoreCard = checkGrids(grids, d, scoreCard);
        if (scoreCard.winningIndexes.length) {
            const results: Array<{ winningGridIndex: number, winningGridResult: number, currentDraw: number }> = [];
            scoreCard.winningIndexes.forEach(i => {
                const sum = calculateScore(grids[i])
                results.push({ winningGridIndex: i, winningGridResult: sum * d, currentDraw: d })
            })
            return results;
        }
    }
    return null
}

function looseBingo() {
    let latestResults: { winningGridIndex: number, winningGridResult: number, currentDraw: number } | null;
    let draw = puzzle.draw;
    while (grids.length > 1) {
        const results = playBingo(draw);
        if (results) {
            const index = draw.indexOf(results[0].currentDraw) + 1;
            draw = draw.slice(index);
            const newScoreCardResults = scoreCard.gridResults.filter((g, i) => !results.some(r => r.winningGridIndex === i));
            const newGrids = grids.filter((g, i) => !results.some(r => r.winningGridIndex === i));
            scoreCard.gridResults = newScoreCardResults;
            console.log("old grids " + grids.length + " new grids " + newGrids.length)
            grids = newGrids;
            latestResults = results[results.length - 1];
        }
    }
    const latestResultsArray = playBingo(draw);
    latestResults = latestResultsArray ?  latestResultsArray[0] : null;
    console.log("Last winning grid is " + latestResults?.winningGridResult + " : " + latestResults?.currentDraw)
}

// const result = playBingo(puzzle.draw)
// console.log(result?.winningGridResult)

looseBingo()