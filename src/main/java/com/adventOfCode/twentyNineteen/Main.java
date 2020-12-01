package com.adventOfCode.twentyNineteen;

import com.adventOfCode.common.PuzzleDay;
import com.adventOfCode.twentyNineteen.dayOne.DayOnePartOne;
import com.adventOfCode.twentyNineteen.dayOne.DayOnePartTwo;
import com.adventOfCode.twentyNineteen.dayTwo.DayTwoPartOne;

public class Main {

    public static void main(String[] args) {
        PuzzleDay dayOnePartOne = new DayOnePartOne();
        PuzzleDay dayOnePartTwo = new DayOnePartTwo();
        PuzzleDay dayTwoPartOne = new DayTwoPartOne();

//        dayOnePartOne.solvePuzzle();
//        dayOnePartTwo.solvePuzzle();
        dayTwoPartOne.solvePuzzle();
    }
}