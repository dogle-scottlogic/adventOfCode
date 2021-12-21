import * as puzzle from './day2.json'

type Direction = "forward" | "down" | "up"

type Movement = { direction: Direction, value: number }

const parseInput = (): Array<Movement> => {
    let input = puzzle.input as string[];
    return input.map((line: String): Movement => {
        let split = line.split(" ");
        return {direction: split[0] as Direction, value: parseInt(split[1])}
    })
}

const calculatePosition = (input: Array<Movement>): number => {
    let aim: number = 0;
    let horizontalPos: number = 0;
    let depth: number = 0;

    input.forEach((movement: Movement) => {
        switch (movement.direction) {
            case "up":
                aim -= movement.value;
                break;
            case "down":
                aim += movement.value;
                break
            case "forward":
                horizontalPos += movement.value;
                depth = depth + (aim * movement.value)
                break
            default:
                break;
        }
    });

    return horizontalPos * depth;
}

const parsedInput = parseInput();
const answer = calculatePosition(parsedInput);
console.log(`answer is ${answer}`)