import { describe, expect, it } from "@jest/globals";
import { getRangesFromMap, RangeMapping } from "./dayFive";

describe("getRangesFromMap", () => {
  it("returns the same ranges where there are no mappings", () => {
    const ranges = ["7:14", "30:13"];
    const mapping = new RangeMapping(["50 98 2", "52 50 48"]);
    const result = getRangesFromMap(ranges, mapping);
    expect(result).toStrictEqual(["7:14", "30:13"]);
  });

  it("returns as single range where everything is mapped", () => {
    const ranges = ["7:14", "30:13"];
    const mapping = new RangeMapping(["8 7 50"]);
    const result = getRangesFromMap(ranges, mapping);
    expect(result).toStrictEqual(["8:14", "31:13"]);
  });

  it("returns as single range where everything is mapped negative", () => {
    const ranges = ["7:14", "30:13"];
    const mapping = new RangeMapping(["6 7 50"]);
    const result = getRangesFromMap(ranges, mapping);
    expect(result).toStrictEqual(["6:14", "29:13"]);
  });

  it("returns range where mapping is at end of values", () => {
    const ranges = ["7:14", "30:20"];
    const mapping = new RangeMapping(["41 40 10"]);
    const result = getRangesFromMap(ranges, mapping);
    expect(result).toStrictEqual(["7:14", "30:10", "41:10"]);
  });
});
