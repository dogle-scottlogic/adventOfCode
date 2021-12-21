package com.adventOfCode.twentyNineteen.dayTwo;

import java.util.Arrays;

public class IntcodeProgram {
    private final String add = "1";
    private final String multiply = "2";
    private final String end = "99";
    private final int next = 4;

    private boolean isNonEndingOperation(String opCode) {
        return opCode.equals(add) || opCode.equals(multiply);
    }

    private boolean validIndices(Integer indexOne, Integer indexTwo, Integer indexThree, int arrayLength) {
        return  indexOne < arrayLength && indexTwo < arrayLength && indexThree < arrayLength;
    }

    private String performCalculation(String inputOne, String inputTwo, String opCode) {
        Integer inputOneInt = Integer.parseInt(inputOne);
        Integer inputTwoInt = Integer.parseInt(inputTwo);
        Integer result = opCode.equals(add) ? inputOneInt + inputTwoInt : inputOneInt * inputTwoInt;
        return result.toString();
    }

    public String[] runProgram(String[] input) {
        int currentIndex = 0;
        String[] values = Arrays.copyOf(input, input.length);

        while (currentIndex < values.length) {


            String opCode = values[currentIndex];

            if (opCode.equals(end)) {
                return values;
            }

            if (isNonEndingOperation(opCode) && currentIndex + 3 < values.length) {
                Integer inputOneIndex = Integer.parseInt(values[currentIndex + 1]);
                Integer inputTwoIndex = Integer.parseInt(values[currentIndex + 2]);
                Integer output = Integer.parseInt(values[currentIndex + 3]);

                if (validIndices(inputOneIndex, inputTwoIndex, output, values.length)) {

                    String inputOne = values[inputOneIndex];
                    String inputTwo = values[inputTwoIndex];

                    String result = performCalculation(inputOne, inputTwo, opCode);
                    values[output] = result;
                }
            }

            currentIndex += next;
        }
        return values;
    }
}
