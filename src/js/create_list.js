import { type } from "./create_details.js";

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

export function createAllList() {
    createList(tierName, tier);
    createList(typeTierBottomName, typeTierBottom);
    createList(typeTierTopName, typeTierTop);
    createList(frontMaterialName, frontMaterial);
}
