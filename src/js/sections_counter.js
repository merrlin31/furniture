import { dataService } from "./section.js";

const form = document.forms.inputForm;
let inputCounter = document.getElementsByClassName('sections__item');

export function sectionCounter() {
    if(form.tier.value === "upSection") {
        (form.leftSection.checked) ? dataService.counter.rightTopSectionCounter++ : dataService.counter.leftTopSectionCounter++;
    } else if(form.tier.value === "downSection") {
        (form.leftSection.checked) ? dataService.counter.rightBottomSectionCounter++ : dataService.counter.leftBottomSectionCounter++;
    }
    dataService.counter.allSectionCounter = dataService.counter.leftBottomSectionCounter + dataService.counter.rightBottomSectionCounter +
        dataService.counter.leftTopSectionCounter + dataService.counter.rightTopSectionCounter;
    let textToInput = [dataService.counter.allSectionCounter, dataService.counter.leftBottomSectionCounter, 
        dataService.counter.rightBottomSectionCounter, dataService.counter.leftTopSectionCounter, dataService.counter.rightTopSectionCounter];
    for (let i = 0; i < inputCounter.length; i++) {
        inputCounter[i].textContent = textToInput[i];
    }
    dataService.addCounter(textToInput);
}