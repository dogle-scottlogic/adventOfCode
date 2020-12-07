package com.adventOfCode.twentyTwenty.daySeven;

import com.adventOfCode.common.FileReader;

import java.util.*;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

/**
 * --- Part Two ---
 * It's getting pretty expensive to fly these days - not because of ticket prices, but because of the ridiculous number of bags you need to buy!
 * <p>
 * Consider again your shiny gold bag and the rules from the above example:
 * <p>
 * faded blue bags contain 0 other bags.
 * dotted black bags contain 0 other bags.
 * vibrant plum bags contain 11 other bags: 5 faded blue bags and 6 dotted black bags.
 * dark olive bags contain 7 other bags: 3 faded blue bags and 4 dotted black bags.
 * So, a single shiny gold bag must contain 1 dark olive bag (and the 7 bags within it) plus 2 vibrant plum bags (and the 11 bags within each of those): 1 + 1*7 + 2 + 2*11 = 32 bags!
 * <p>
 * Of course, the actual rules have a small chance of going several levels deeper than this example; be sure to count all of the bags, even if the nesting becomes topologically impractical!
 * <p>
 * Here's another example:
 * <p>
 * shiny gold bags contain 2 dark red bags.
 * dark red bags contain 2 dark orange bags.
 * dark orange bags contain 2 dark yellow bags.
 * dark yellow bags contain 2 dark green bags.
 * dark green bags contain 2 dark blue bags.
 * dark blue bags contain 2 dark violet bags.
 * dark violet bags contain no other bags.
 * In this example, a single shiny gold bag must contain 126 other bags.
 * <p>
 * How many individual bags are required inside your single shiny gold bag?
 */
public class DaySevenPartTwo extends DaySeven {

    private int findTotalBags(String bagName, List<String> allBags) {
        int count = 0;
        String bagInfo = allBags.stream().filter(b -> b.startsWith(bagName)).findFirst().orElse(null);
        Pattern BAG_REGEX = Pattern.compile("[0-9](.+?)bag");
        Pattern NUM_REGEX = Pattern.compile("([0-9])");
        Pattern NO_BAGS_MATCHER = Pattern.compile("no other bags");
        String[] bagSplit = bagInfo.split(" bags contain ");
        final Matcher noBagMatcher = NO_BAGS_MATCHER.matcher(bagSplit[1]);
        if (noBagMatcher.find()) {
            return 0;
        } else {
            String[] nestedBags = bagSplit[1].split(", ");
            for (String bag : nestedBags) {
                Matcher numMatcher = NUM_REGEX.matcher(bag);
                Matcher bagColourMatcher = BAG_REGEX.matcher(bag);
                if (numMatcher.find() && bagColourMatcher.find()) {
                    int bagNumber = Integer.parseInt(numMatcher.group(1));
                    String bagColour = bagColourMatcher.group(1).trim();

                    count += bagNumber;
                    int totalNestedBags = findTotalBags(bagColour, allBags);
                    count += totalNestedBags * bagNumber;
                }
            }
            return count;
        }
    }


    @Override
    public void solvePuzzle() {
        List<String> input = FileReader.readFileStringToList("src/main/java/com/adventOfCode/twentyTwenty/daySeven/input.txt");
        Map<String, Set<String>> convertedInput = convertInput(input);
        int result = findTotalBags("shiny gold", input);
        System.out.println(result);

    }
}
