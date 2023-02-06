import { typeSection } from "./create_details.js";

const form = document.forms.inputForm;

const tierName = {};
const typeTierBottomName = {};
const typeTierTopName = {};
const typeTierTop = form.typeTierTop;
const typeTierBottom = form.typeTierBottom;
const tier = form.tier;
const frontMaterial = form.frontMaterial;

const frontMaterialName = {
    dsp: 'ДСП',
    mdf: 'МДФ',
};

for (let item in typeSection()) {
    tierName[item] = typeSection()[item].name
}
Object.entries(typeSection().downSection).forEach(([key, value]) => {
    key !== 'name' ? typeTierBottomName[key] = value.name : key;
})
Object.entries(typeSection().upSection).forEach(([key, value]) => {
    key !== 'name' ? typeTierTopName[key] = value.name : key;
})

function createList(List, input) {
    for (let item in List) {
        let option = new Option(List[item], item);
        input.append(option);
    }
}

export function createAllList() {
    createList(tierName, tier);
    createList(typeTierBottomName, typeTierBottom);
    createList(typeTierTopName, typeTierTop);
    createList(frontMaterialName, frontMaterial);
}
