package com.adventOfCode.twentyTwenty.dayFour;

import com.adventOfCode.common.PuzzleDay;

import java.util.Map;

public abstract class DayFour implements PuzzleDay {

    protected ValidationStrategy validationStrategy = new SimpleValidation();

    private boolean allFieldsValid(Map<String, Boolean> validFields) {
        return validFields.get("byr") &&
                validFields.get("iyr") &&
                validFields.get("eyr") &&
                validFields.get("hgt") &&
                validFields.get("hcl") &&
                validFields.get("ecl") &&
                validFields.get("pid");
    }

    protected boolean isPassportValid(String passport) {
        String[] fields = passport.trim().split(" ");
        Map<String, Boolean> validFields = validationStrategy.validate(fields);
        return allFieldsValid(validFields);
    }

}
