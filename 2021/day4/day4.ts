import * as puzzle from './day4.json'

type Grid = Array<Array<string>>;
type Coords = { rIndex: number, cIndex: number };
const gridArray = puzzle.grids.split(/\n\n/);
const grids: any = gridArray.map((grid) => grid.split(/\n/).map(row => row.trim().split(/\s+/)));

type ScoreCard = {
    gridResults: Array<{ rows: Array<number>, cols: Array<number> }>,
    winningIndex: number | null;
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
    let winningIndex = null;
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
                console.log("Grid number " + gridIndex + " has won");
                winningIndex = gridIndex;
                return;
            }
        }
    })
    return {
        gridResults: scoreCard.gridResults,
        winningIndex
    };
}

function calculateScore(winningGGrid: Grid): number {
    const sum = gridReduce(winningGGrid, (acc, cur) => {
        return cur.charAt(0) === 'x' ? acc : acc += parseInt(cur)
    }, 0);
    return sum;
}

function playBingo(): number {
    let scoreCard: ScoreCard = {
        gridResults: Array.from({length: grids.length}, x => ({
            // assume always a 5 x 5 grid for now
            rows: [0, 0, 0, 0, 0],
            cols: [0, 0, 0, 0, 0]
        })),
        winningIndex: null
    }

    for (const draw of puzzle.draw) {
        scoreCard = checkGrids(grids, draw, scoreCard);
        console.log(scoreCard.winningIndex)
        if (scoreCard.winningIndex != null) {
            const sum = calculateScore(grids[scoreCard.winningIndex])
            return sum * draw;
        }
    }
    return 0
}

const result = playBingo()
console.log(result)