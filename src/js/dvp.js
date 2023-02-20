import { constants } from "./constants.js";

const form = document.forms.inputForm;

export class Dvp {
    constructor(section) {
        this.section = section.section
    }

    createDvp() {
        let dvpHeight, dvpUpHeight, dvpWidth, dvp, upDvp;
        let quantity = 1;
        let allDvp = []
        if (form.tier.value === "downSection") {
            dvpHeight = this.section.sectionHeight - constants.constant('indentDvp');
            dvpWidth = this.section.sectionWidth - constants.constant('indentDvp');
            dvpUpHeight = this.section.kitchenHeight - form.plinth.value - dvpHeight;
            if (this.section.sectionType === "cornerBottomSection") dvpHeight -= constants.constant('indentWall');
            if (form.oven.checked) {
                (this.section.sectionType === "cupboardSection") 
                ? dvpUpHeight -= constants.constant('ovenHeight')
                : dvpHeight -= constants.constant('ovenHeight');
            }
            if (form.microwave.checked) dvpUpHeight -= constants.constant('microwaveHeight');
            dvp = [[dvpHeight], [dvpWidth], [quantity]];
            (form.sink.checked || form.dishwasher.checked || form.fridge.checked) ? console.log('Не добавляем ДВП') : allDvp.push(dvp);
            if (form.fridge.checked) dvpUpHeight = this.section.kitchenHeight - constants.constant('fridgeHeight') - constants.constant('indentDvp');
            upDvp = [[dvpUpHeight], [dvpWidth], [quantity]];
            console.log()
            if (this.section.sectionType === "cupboardSection") allDvp.push(upDvp);
        } else {
            dvpHeight = this.section.sectionUpHeight - constants.constant('materialWidth') + constants.constant('dvpGrooveDepth') - constants.constant('indentDvp');
            dvpWidth = this.section.sectionWidth - constants.constant('materialWidth') * 2 + constants.constant('dvpGrooveDepth') * 2 - constants.constant('indentDvp');
            dvp = [[dvpHeight], [dvpWidth], [quantity]]
            allDvp.push(dvp);
        }

        return allDvp
    }
}