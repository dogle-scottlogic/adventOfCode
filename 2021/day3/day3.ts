import * as puzzle from './day3.json'

type GammaEpsilon = { gRate: number, eRate: number }

const calculateGammaEpsilon = (input: Array<string>): GammaEpsilon => {
    // Array of 0's the length of the first string in the list
    // Assumes that all strings in list are of equal length
    const tally: Array<number> = Array.from({length: input[0].length}, x => 0)
    let gammaEpsilon = input.reduce<GammaEpsilon>((acc, cur, i, org) => {
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

