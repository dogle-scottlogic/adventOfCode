import * as puzzle from './test.json'

type Grid = Array<Array<string>>;
type Coords = { rIndex: number, cIndex: number };
const gridArray = puzzle.grids.split(/\n\n/);
const grids: any = gridArray.map((grid) => grid.split(/\n/).map(row => row.trim().split(/\s+/)));

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


function checkGrids(grids: Array<Grid>, num: number): boolean {
    // init the results with the default for each grid in the input
    const gridResults =
        Array.from({length: grids.length}, x => ({
            // assume always a 5 x 5 grid for now
            rows: [0, 0, 0, 0, 0],
            cols: [0, 0, 0, 0, 0]
        }));

    grids.forEach((grid: Grid, gridIndex: number) => {
        const matchingCoords = gridReduce<string, Coords | null>(grid, (acc, cellValue, cellCoords) => {
            return parseInt(cellValue) === num ? cellCoords : acc;
        }, null);

        if (matchingCoords) {
            // when a number matches increment the col and row in the gridResults.
            // mark the number by adding an x to the end
            const updatedResultsGrid = gridResults[gridIndex];
            updatedResultsGrid.rows[matchingCoords.rIndex]++;
            updatedResultsGrid.cols[matchingCoords.cIndex]++;
            gridResults[gridIndex] = updatedResultsGrid;
            grids[gridIndex][matchingCoords.rIndex][matchingCoords.cIndex] =
                "x" + grids[gridIndex][matchingCoords.rIndex][matchingCoords.cIndex];

            if (
                updatedResultsGrid.rows[matchingCoords.rIndex] === 5 ||
                updatedResultsGrid.cols[matchingCoords.cIndex] === 5
            ) {
                console.log("Grid number " + gridIndex + " has won");
                return true
            }

        }
    })
    return false;
}


function playBingo() {
    let winnerFound = false;

    puzzle.draw.forEach((num: number) => {
        winnerFound = checkGrids(grids, num);

        if (winnerFound) {}
        return true
    });

    // for each number drawn: go through all numbers in all grids
    // when a number matches increment the col and row in the gridResults.
    // mark the number by adding an x to the end
    // if the number === 5 then that grid has won.
    // pass the grid to a function that will total the values
    // iterate the grid and total all numbers not marked with an x.
    // will need an iterate grid util function
}

playBingo()