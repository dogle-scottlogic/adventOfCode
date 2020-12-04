package com.adventOfCode.twentyTwenty.dayFour;

import java.util.HashMap;
import java.util.Map;

public class SimpleValidation implements ValidationStrategy {

    @Override
    public Map<String, Boolean> validate(String[] fields) {
        Map<String, Boolean> validFields = new HashMap() {{
            put("byr", false);
            put("iyr", false);
            put("eyr", false);
            put("hgt", false);
            put("hcl", false);
            put("ecl", false);
            put("pid", false);
        }};

        for (String field : fields) {
            int colonIndex = field.indexOf(":");
            String fieldName = colonIndex >= 0 ? field.substring(0, colonIndex) : "";
            if (!fieldName.isEmpty()) {
                validFields.put(fieldName, true);
            }
        }
        return validFields;
    }
}
