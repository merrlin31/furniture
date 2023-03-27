import { type } from "./section.js";

const form = document.forms.inputForm;
const form1 = document.forms.setttingsForm1;



const tierName = {};
const typeTierBottomName = {};
const typeTierTopName = {};
const typeTierTop = form.typeTierTop;
const typeTierBottom = form.typeTierBottom;
const tier = form.tier;
const frontMaterial = form.frontMaterial;
const tabletopLenght = form.tabletopLength;
const manufacturer = document.querySelector('#manufacturer')

const frontMaterialName = {
    dsp: 'ДСП',
    mdf: 'МДФ',
};
const tabletopLenghtName = {
    3050: 3050,
    4100: 4100,
    4200: 4200,
};
const manufacturerName = {
    muller: 'Muller',
    hettich: 'Hettich',
    china: 'Китай',
    camar: 'Camar',
    termoplast: 'Termoplast',
    ukraine: 'Украина',
    poland: 'Польща',
};
export const bodyManufacturerName = {
    kronospan: 'Kronospan',
    swisskrono: 'Swiss Krono',
    egger: 'Egger',
    cleaf: 'Cleaf',
    saviola: 'Saviola',
};
export const frontManufacturerName = {
    kronospan: 'Kronospan',
    swisskrono: 'Swiss Krono',
    egger: 'Egger',
    cleaf: 'Cleaf',
    saviola: 'Saviola',
    plow: 'МДФ плівка',
    paunt: 'МДФ фарба'
};
export const tabletopManufacturerName = {
    kronospan: 'Kronospan',
    swisskrono: 'Swiss Krono',
    egger: 'Egger',
    luxeform: 'Luxeform',
    arpa: 'Arpa',
    fenix: 'FENIX',
    ricci: 'RICCI'
};
export const dvpManufacturerName = {
    kronospan: 'Kronospan',
    pfleiderer: 'Pfleiderer',
};


for (let item in type) {
    tierName[item] = type[item].name
}
Object.entries(type.downSection).forEach(([key, value]) => {
    if (key !== 'name') typeTierBottomName[key] = value.name;
})
Object.entries(type.upSection).forEach(([key, value]) => {
    if (key !== 'name') typeTierTopName[key] = value.name;
})

function createList(List, input) {
    for (let item in List) {
        let option = new Option(List[item], item);
        input.append(option);
    }
}


export function createFrontOpeningList(item, value) {
    let opening = {
        handle: 'Ручка',
        push: 'Push to open',
        [value]: item
    }
    form.frontOpening.textContent = ''
    createList(opening, form.frontOpening)
}
createFrontOpeningList('Gola', 'gola')


export function createAllList() {
    createList(tierName, tier);
    createList(typeTierBottomName, typeTierBottom);
    createList(typeTierTopName, typeTierTop);
    createList(frontMaterialName, frontMaterial);
    createList(tabletopLenghtName, tabletopLenght);
    createList(manufacturerName, manufacturer);
    createList(bodyManufacturerName, form1.bodyManufacturer);
    createList(frontManufacturerName, form1.frontManufacturer);
    createList(tabletopManufacturerName, form1.tabletopManufacturer);
    createList(dvpManufacturerName, form1.dvpManufacturer);
}
