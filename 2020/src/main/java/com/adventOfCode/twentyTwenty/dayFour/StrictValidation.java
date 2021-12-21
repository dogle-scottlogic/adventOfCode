package com.adventOfCode.twentyTwenty.dayFour;

import java.util.HashMap;
import java.util.Locale;
import java.util.Map;
import java.util.regex.Pattern;

public class StrictValidation implements ValidationStrategy {
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
        boolean valid = true;

        for (String field : fields) {
            if (!valid) {
                return validFields;
            }

            String[] fieldValues = field.split(":");

            switch (fieldValues[0]) {
                case "byr":
                    valid = isValidBirthYear(fieldValues[1]);
                    validFields.put(fieldValues[0], valid);
                    break;
                case "iyr":
                    valid = isValidIssueYear(fieldValues[1]);
                    validFields.put(fieldValues[0], valid);
                    break;
                case "eyr":
                    valid = isValidExpYear(fieldValues[1]);
                    validFields.put(fieldValues[0], valid);
                    break;
                case "hgt":
                    valid = isValidHeight(fieldValues[1]);
                    validFields.put(fieldValues[0], valid);
                    break;
                case "hcl":
                    valid = isValidHairColour(fieldValues[1]);
                    validFields.put(fieldValues[0], valid);
                    break;
                case "ecl":
                    valid = isValidEyeColour(fieldValues[1]);
                    validFields.put(fieldValues[0], valid);
                    break;
                case "pid":
                    valid = isValidPassportId(fieldValues[1]);
                    validFields.put(fieldValues[0], valid);
                    break;
                default:
                    break;
            }
        }
        return validFields;
    }

    private Boolean isValidPassportId(String fieldValue) {
        Pattern pattern = Pattern.compile("[0-9]{9}", Pattern.CASE_INSENSITIVE);
        return pattern.matcher(fieldValue).matches();
    }

    private Boolean isValidEyeColour(String fieldValue) {
        Pattern pattern = Pattern.compile("amb|blu|brn|gry|grn|hzl|oth", Pattern.CASE_INSENSITIVE);
        return pattern.matcher(fieldValue).matches();
    }

    private Boolean isValidHairColour(String fieldValue) {
        Pattern pattern = Pattern.compile("#[a-f, 0-9]{0,6}", Pattern.CASE_INSENSITIVE);
        return pattern.matcher(fieldValue).matches();
    }

    private Boolean isValidHeight(String fieldValue) {
        try {
            String hValue = fieldValue.substring(0, fieldValue.length() - 2);
            String unit = fieldValue.substring(fieldValue.length() - 2);
            boolean unitValid = unit.equals("cm") || unit.equals("in");
            int height = Integer.parseInt(hValue);
            if (unitValid) {
                if (unit.equals("cm")) {
                    return height >= 150 && height <= 193;
                } else {
                    return height >= 59 && height <= 76;
                }
            }
            return false;
        } catch (Exception e) {
            return false;
        }
    }

    private Boolean isValidExpYear(String fieldValue) {
        try {
            int year = Integer.parseInt(fieldValue);
            return  year >= 2010 && year <= 2030;
        } catch (Exception e) {
            return false;
        }
    }

    private Boolean isValidIssueYear(String fieldValue) {
        try {
            int year = Integer.parseInt(fieldValue);
            return  year >= 2010 && year <= 2020;
        } catch (Exception e) {
            return false;
        }
    }

    private Boolean isValidBirthYear(String fieldValue) {
        try {
            int year = Integer.parseInt(fieldValue);
            return  year >= 1920 && year <= 2002;
        } catch (Exception e) {
            return false;
        }
    }
}
