import { dataService } from "./data_service.js";

const setttingsForm = document.forms.setttingsForm;
const indentBtn = setttingsForm.indentButton;

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
function getConstants() {
const constanceValue = [setttingsForm.indentCountertop.value, setttingsForm.indentShelve.value, setttingsForm.materialWidth.value, 
    setttingsForm.indentWall.value, setttingsForm.indentCornerSection.value, setttingsForm.indentCupboard.value, setttingsForm.indentHood.value, 
    setttingsForm.indentJoinSection.value, setttingsForm.partition.value, setttingsForm.indentFront.value, 
    setttingsForm.ovenHeight.value, setttingsForm.microwaveHeight.value, setttingsForm.ovenDrawer.value,
    setttingsForm.indentBackside.value, setttingsForm.dvpGrooveDepth.value, setttingsForm.fridgeHeight.value, 
    setttingsForm.indentDvp.value, setttingsForm.indentPlinth.value];
    return constanceValue;
}
export let constants = new Constants(...getConstants())

indentBtn.addEventListener('click', (event) => {
    event.preventDefault();
    constants = new Constants(...getConstants());
    dataService.addConstant(constants);
})