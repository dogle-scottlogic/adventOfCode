package com.adventOfCode.twentyTwenty.dayEight;

import com.adventOfCode.common.PuzzleDay;

import java.util.List;

public abstract class DayEight implements PuzzleDay {
    protected String[] getInstructionParts(String instruction) {
        String[] split = instruction.split(" ");
        String sign = split[1].substring(0, 1);
        String number = split[1].substring(1);
        return new String[]{split[0], sign, number};
    }

    protected boolean runProgram(List<String> programCode, ProgramEndCondition programEndCondition) {
        int programIndex = 0;
        int accumulator = 0;

        while (!programEndCondition.shouldEnd(accumulator, programIndex)) {
            String[] instructionParts = getInstructionParts(programCode.get(programIndex));
            String operation = instructionParts[0];
            String sign = instructionParts[1];
            int number = Integer.parseInt(instructionParts[2]);

            switch (operation) {
                case "acc":
                    accumulator = sign.equals("+") ? accumulator + number : accumulator - number;
                    programIndex++;
                    break;
                case "jmp":
                    programIndex = sign.equals("+") ? programIndex + number : programIndex - number;
                    break;
                case "nop":
                    programIndex++;
                default:
                    break;
            }
        }
        return programEndCondition.terminatedCorrectly(programIndex);
    }
}
