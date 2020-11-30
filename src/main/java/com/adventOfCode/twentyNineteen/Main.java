package com.adventOfCode.twentyNineteen;

import com.adventOfCode.common.PuzzleDay;
import com.adventOfCode.twentyNineteen.dayOne.DayOnePartOne;
import com.adventOfCode.twentyNineteen.dayOne.DayOnePartTwo;

public class Main {

    public static void main(String[] args) {
        PuzzleDay dayOnePartOne = new DayOnePartOne();
        dayOnePartOne.solvePuzzle();

        PuzzleDay dayOnePartTwo = new DayOnePartTwo();
        dayOnePartTwo.solvePuzzle();
    }
}