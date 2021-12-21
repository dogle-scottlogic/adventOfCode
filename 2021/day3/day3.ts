import * as puzzle from './day3.json'

type Rating = { gRate: number, eRate: number }

const calculateGammaEpsilon = (input: Array<string>): Rating => {
    // Array of 0's the length of the first string in the list
    // Assumes that all strings in list are of equal length
    const tally: Array<number> = Array.from({length: input[0].length}, x => 0)
    let gammaEpsilon = input.reduce<Rating>((acc, cur, i, org) => {
        let gamma: Array<number> = [];
        cur.split("").forEach((char: string, index: number) => {
            tally[index] += parseInt(char)
            gamma.push(tally[index] > Math.floor(org.length / 2) ? 1 : 0);
        })

        let epsilon = gamma.map(x => x === 0 ? 1 : 0);
        const gDecimal = parseInt(gamma.join(""), 2);
        const eDecimal = parseInt(epsilon.join(""), 2);

        return {gRate: gDecimal, eRate: eDecimal};
    }, {gRate: 0, eRate: 0})
    return gammaEpsilon;
}

const result = calculateGammaEpsilon(puzzle.input);
const answer = result.gRate * result.eRate;
console.log(result)
console.log(answer)

// Part two
const calculateGenScrubRatings = (oxList: Array<string>, coList: Array<string>, position: number = 1): Rating => {
    if (oxList.length === 1 && coList.length === 1) {
        const oxDecimal = parseInt(oxList[0], 2);
        const coDecimal = parseInt(coList[0], 2);
        return {
            gRate: oxDecimal,
            eRate: coDecimal
        }
    }

    if (position > oxList[0].length) {
        console.error("Position value is greater than binary string lengths")
        throw new Error("!")
    }

    // Split into two lists dependent on the value at the current position (1, 0)
    type StartsWithSplit = { swo: Array<string>, swz: Array<string> }
    const startWithSplitter = (acc: StartsWithSplit, cur: string) => {
        cur.charAt(position - 1) === "1" ? acc.swo.push(cur) : acc.swz.push(cur);
        return acc;
    }

    const oxStartsWithSplit = oxList.reduce<StartsWithSplit>(startWithSplitter, { swo: [], swz: []});
    const coStartsWithSplit = coList.reduce<StartsWithSplit>(startWithSplitter, { swo: [], swz: []});

    let newOxList = oxList;
    let newCoList = coList;

    if (oxList.length > 1) {
        newOxList = oxStartsWithSplit.swo;
        if (oxStartsWithSplit.swo.length < oxStartsWithSplit.swz.length) {
            newOxList = oxStartsWithSplit.swz;
        }
    }

    if (coList.length > 1) {
        newCoList = coStartsWithSplit.swz;
        if (coStartsWithSplit.swo.length < coStartsWithSplit.swz.length) {
            newCoList = coStartsWithSplit.swo;
        }
    }

    return calculateGenScrubRatings(newOxList, newCoList, position + 1);
}

const resultTwo = calculateGenScrubRatings(puzzle.input, puzzle.input, 1);
const answerTwo = resultTwo.gRate * resultTwo.eRate;
console.log(answerTwo)