// https://adventofcode.com/2023/day/2

import * as fs from 'fs';

function readData(): string[] {
    const words = fs.readFileSync('data/2-1.txt', 'utf-8');
    return words.split('\r\n');
}

export function dayTwoPartOne() {
    const bagContents: { red: number, green: number, blue: number } = {
        red: 12,
        green: 13,
        blue: 14
    };
    const games = readData().map(line => line.split(":")[1].trim());

    const isGamePossible = (game: string): boolean => {
        const sets = game.split(";")
        console.log(sets);
        return true;
    }

    games.forEach(g => isGamePossible(g));
}