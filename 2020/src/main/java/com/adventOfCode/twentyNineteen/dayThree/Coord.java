package com.adventOfCode.twentyNineteen.dayThree;

public class Coord {

    private char staticAxis;
    private int staticCoord;
    private int[] rangeCoord;

    public Coord() {}

    public  Coord(char staticAxis, int staticCoord, int[] rangeCoord) {
        this.staticAxis = staticAxis;
        this.staticCoord = staticCoord;
        this.rangeCoord = rangeCoord;
    }

    public char getStaticAxis() {
        return staticAxis;
    }

    public void setStaticAxis(char staticAxis) {
        this.staticAxis = staticAxis;
    }

    public int getStaticCoord() {
        return staticCoord;
    }

    public void setStaticCoord(int staticCoord) {
        this.staticCoord = staticCoord;
    }

    public int[] getRangeCoord() {
        return rangeCoord;
    }

    public void setRangeCoord(int[] rangeCoord) {
        this.rangeCoord = rangeCoord;
    }

}
