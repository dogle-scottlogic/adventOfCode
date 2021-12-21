package com.adventOfCode.twentyTwenty.dayEight;

public interface ProgramEndCondition {
    public boolean shouldEnd(int accumulatorValue, int instructionIndex);
    public boolean terminatedCorrectly(int instructionIndex);
}
