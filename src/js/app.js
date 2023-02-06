import * as flsFunctions from "./modules/functions.js";
import Swiper, { Navigation, Pagination } from 'swiper';

const swiper = new Swiper();

flsFunctions.isWebp();
// -------------------------
const form = document.forms.inputForm;
const btn = form.inputButton;

import { createAllList } from "./create_list.js";
import { createSection } from "./create_details.js";

createAllList()

const tier = form.tier;
let typeCabineBottom = form.typeTierBottom;
let typeCabineTop = form.typeTierTop;
let sectionType = `${typeTierBottom.value}`;
let heightTopSection = form.heightUpSection;
export const shelves = document.querySelector('.input__shelves');
export const drawers = document.querySelector('.input__drawers');
const visibleSide = document.querySelector('.input__visible-side');
const sink = document.querySelector('.input__sink');
const oven = document.querySelector('.input__oven');
const microwave = document.querySelector('.input__microwave');
const dish = document.querySelector('.input__dish');
export const neighboringWidth = document.querySelector('.input__neighboring');

const depth = form.depth;
const optionsItem = form.querySelectorAll('.options__item');
tier.addEventListener('change', function() {
    typeCabineBottom.firstElementChild.selected = true;
    typeCabineTop.firstElementChild.selected = true;
    
    if (this.value === "upSection") {
        optionsItem.forEach((item) => item.classList.add('hide'))
        typeTierBottom.classList.add('hide');
        typeTierTop.classList.remove('hide');
        shelves.classList.remove('hide');
        dish.classList.remove('hide');
        depth.value = 300;
        sectionType = `${typeTierTop.value}`;
    } else {
        optionsItem.forEach((item) => item.classList.remove('hide'))
        depth.value = 600;
        typeTierTop.classList.add('hide');
        typeTierBottom.classList.remove('hide');
        neighboringWidth.classList.add('hide');
        microwave.classList.add('hide')
        dish.classList.add('hide');
        sectionType = `${typeTierBottom.value}`;
    }
})
typeCabineBottom.addEventListener('change', function() {
    optionsItem.forEach((item) => item.classList.remove('hide'));
    sectionType = `${typeTierBottom.value}`;
    form.drawers.value = 0;
    form.shelves.value = 0;
    form.front.readOnly = false;
    form.shelves.readOnly = false;
    if (this.value === "originalBottomSection") {
        neighboringWidth.classList.add('hide');
        microwave.classList.add('hide')
        dish.classList.add('hide');
        
    } else if (this.value === "cornerBottomSection") {
        drawers.classList.add('hide');
        oven.classList.add('hide');
        microwave.classList.add('hide')
        dish.classList.add('hide');
    }  else {
        neighboringWidth.classList.add('hide');
        sink.classList.add('hide');
        visibleSide.classList.add('hide');
        microwave.classList.remove('hide')
        dish.classList.add('hide');
        form.front.value = 1;
    }
})
typeCabineTop.addEventListener('change', function() {
    optionsItem.forEach((item) => item.classList.add('hide'));
    sectionType = `${typeTierTop.value}`;
    if (this.value === "originalTopSection") {
        shelves.classList.remove('hide');
        dish.classList.remove('hide');
    } else if (this.value === "hoodSection") {
        shelves.classList.remove('hide');
    } else if (this.value === "cornerTopSection") {
        shelves.classList.remove('hide');
        neighboringWidth.classList.remove('hide');
        dish.classList.remove('hide');
    } else {
        shelves.classList.remove('hide');
        dish.classList.remove('hide');
    }
})
heightTopSection.addEventListener('focus', function() {
    heightTopSection.value = (heightKitchen.value - heightDownSection.value - 600);
})
form.drawers.addEventListener('change', function() {
    if (form.drawers.value > 0) {
        form.front.value = 1;
        form.front.readOnly = true;
        if (typeCabineBottom.value !== "cupboardSection") {
            form.shelves.value = 0;
            form.shelves.readOnly = true;
        }
    } else {
        form.front.readOnly = false;
        form.shelves.readOnly = false;
    };
})

btn.addEventListener('click', (event) => {
    let options = document.querySelectorAll('.input__options input');
    form.front.readOnly = false;
    event.preventDefault();
    createSection(tier.value, sectionType);

    options.forEach((item) => item.checked = false);
    optionsItem.forEach((item) => item.lastElementChild.value = '0')
})