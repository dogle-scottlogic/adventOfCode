package com.adventOfCode.twentyTwenty.daySeven;

import com.adventOfCode.common.PuzzleDay;

import java.util.*;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

public abstract class DaySeven implements PuzzleDay {
    protected Map<String, Set<String>> convertInput(List<String> input) {
        Map<String, Set<String>> result = new HashMap();
        for (String bag : input) {
            String[] bagSplit = bag.split(" bags contain ");
            String bagName = bagSplit[0];
            final Pattern BAG_REGEX = Pattern.compile("[0-9](.+?)bag", Pattern.DOTALL);
            final Set<String> bagColours = new HashSet();
            final Matcher matcher = BAG_REGEX.matcher(bagSplit[1]);
            while (matcher.find()) {
                bagColours.add(matcher.group(1).trim());
            }
            result.put(bagName, bagColours);
        }
        return result;
    }

}
