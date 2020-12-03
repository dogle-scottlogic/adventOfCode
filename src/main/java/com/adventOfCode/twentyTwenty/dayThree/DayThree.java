package com.adventOfCode.twentyTwenty.dayThree;

import com.adventOfCode.common.PuzzleDay;

import java.util.List;

public abstract class DayThree implements PuzzleDay {
    /**
     * @param pattern
     * @return trees encountered
     */
    protected int traverseSlope(List<String> pattern, int stepsRight, int stepsDown) {
        int currentPatternStartIndex = 0;
        int treesEncountered = 0;

        for (int i = 0; i < pattern.size(); i+=stepsDown) {
            if (i + stepsDown < pattern.size()) {
                String rowDown = pattern.get(i + stepsDown);
                boolean tree = findTreeFromIndex(rowDown, currentPatternStartIndex, stepsRight);

                if (tree) {
                    treesEncountered++;
                }
                currentPatternStartIndex += stepsRight;
            }
        }
        return treesEncountered;
    }

    private boolean findTreeFromIndex(String row, int start, int padding) {
        char endSpot;
        endSpot = row.charAt((start + padding) % row.length());
        return endSpot == '#';
    }

}
