package com.adventOfCode.twentyTwenty.dayFour;

import java.util.Map;

public interface ValidationStrategy {
    public Map<String, Boolean> validate(String[] fields);
}
