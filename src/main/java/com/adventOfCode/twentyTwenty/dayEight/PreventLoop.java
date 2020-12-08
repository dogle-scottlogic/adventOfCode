package com.adventOfCode.twentyTwenty.dayEight;

import java.util.HashSet;
import java.util.Set;

public class PreventLoop implements ProgramEndCondition {

    private Set seen;
    private int instructionLength;

    public PreventLoop(int instructionLength) {
        this.seen = new HashSet<Integer>();
        this.instructionLength = instructionLength;
    }

    @Override
    public boolean shouldEnd(int accumulatorValue, int instructionIndex) {
        if (seen.contains(instructionIndex) || terminatedCorrectly(instructionIndex)) {
            System.out.println("Acc Value is: " + accumulatorValue);
            return true;
        }
        seen.add(instructionIndex);
        return false;
    }

    @Override
    public boolean terminatedCorrectly(int instructionIndex) {
        boolean correct = instructionIndex == instructionLength;
        if (correct) {
            System.out.println("Program ended  correctly.");
        }
        return correct;
    }
}
