import * as puzzle from './test.json'

const gridArray = puzzle.grids.split(/\n\n/);
const grids: any = gridArray.map((grid) => grid.split(/\n/).map(row => row.trim().split(/\s+/)));
console.log(grids.length)
console.log(grids[0])

function playBingo() {
    const scoreSheetDefault = {
        // assume always a 5 x 5 grid for now
        rows: [0, 0, 0, 0, 0],
        cols: [0, 0, 0, 0, 0]
    }

    // init the results with the default for each grid in the input
    const gridResults: Array<typeof scoreSheetDefault> =
        Array.from({length: grids.length}, x => scoreSheetDefault);

    // Returns the coords of the found value
    type Coords = { rIndex: number, cIndex: number };

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

    puzzle.draw.forEach((num: number) => {
        // for each number drawn: go through all numbers in all grids
        grids.forEach((grid: Array<Array<string>>, gridIndex: number) => {
            const matchingCoords = gridReduce<string, Coords | null>(grid, (acc, cellValue, cellCoords) => {
                return parseInt(cellValue) === num ? cellCoords : acc;
            }, null);

            if (matchingCoords) {
                // when a number matches increment the col and row in the gridResults.
                // mark the number by adding an x to the end
                const updatedResultsGrid = gridResults[gridIndex];
                updatedResultsGrid.rows[matchingCoords.rIndex]++;
                updatedResultsGrid.cols[matchingCoords.cIndex]++;
                grids[gridIndex][matchingCoords.rIndex][matchingCoords.cIndex] =
                    "x" + grids[gridIndex][matchingCoords.rIndex][matchingCoords.cIndex]
            }
        })
    });

    // for each number drawn: go through all numbers in all grids
    // when a number matches increment the col and row in the gridResults.
    // mark the number by adding an x to the end
    // if the number === 5 then that grid has won.
    // pass the grid to a function that will total the values
    // iterate the grid and total all numbers not marked with an x.
    // will need an iterate grid util function
}