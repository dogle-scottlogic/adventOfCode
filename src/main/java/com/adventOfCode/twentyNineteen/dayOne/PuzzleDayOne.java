package com.adventOfCode.twentyNineteen.dayOne;

import com.adventOfCode.common.PuzzleDay;

public abstract class PuzzleDayOne implements PuzzleDay {

    protected static int fuelCalculation(int mass) {
        return (int)(mass / 3) - 2;
    }

}
