class Constants {
    constructor(indentCountertop, indentShelve, materialWidth, indentWall, indentCornerSection,
    indentCupboard, indentHood, indentJoinSection, partition, indentFront,
    ovenHeight, microwaveHeight, ovenDrawer, indentBackside, dvpGrooveDepth, fridgeHeight,
    indentDvp, indentPlinth) {
        this.indentCountertop = indentCountertop;
        this.indentShelve = indentShelve;
        this.materialWidth = materialWidth;
        this.indentWall = indentWall;
        this.indentCornerSection = indentCornerSection;
        this.indentCupboard = indentCupboard;
        this.indentHood = indentHood;
        this.indentJoinSection = indentJoinSection;
        this.partition = partition;
        this.indentFront = indentFront;
        this.ovenHeight = ovenHeight;
        this.microwaveHeight = microwaveHeight;
        this.ovenDrawer = ovenDrawer;
        this.indentBackside = indentBackside;
        this.dvpGrooveDepth = dvpGrooveDepth;
        this.fridgeHeight = fridgeHeight;
        this.indentDvp = indentDvp;
        this.indentPlinth = indentPlinth;
    }

    constant(value) {
        return this[value]
    }
}
const constanceValue = [60, 20, 18, 50, 2, 20, 100, 20, 70, 3, 600, 362, 83, 20, 5, 2000, 2, 70];
export let constants = new Constants(...constanceValue)