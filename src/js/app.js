import * as flsFunctions from "./modules/functions.js";
import Swiper, { Navigation, Pagination } from 'swiper';

const swiper = new Swiper();

flsFunctions.isWebp();
// -------------------------
const form = document.forms.inputForm;
const btn = form.inputButton;

import { createAllList } from "./create_list.js";
import { SectionDimensions } from "./section.js";

createAllList()

function fillInput() {
    form.bodyCode.value = 55566;
    form.bodyPrice.value = 2200;
    form.frontCode.value = 6666;
    form.frontPrice.value = 2500;
    form.dvpCode.value = 11111;
    form.dvpPrice.value = 1100;
    form.tabletopCode.value = 77765;
    form.tabletopPrice.value = 5000;
    form.heightKitchen.value = 2500;
    form.heightUpSection.value = form.heightKitchen.value - form.heightDownSection.value;
    form.plinth.value = 100;
    form.countertopThickness.value = 38;
    form.sectionWidth.value = 600;
};
fillInput();

const tier = form.tier;
let typeCabineBottom = form.typeTierBottom;
let typeCabineTop = form.typeTierTop;
let heightTopSection = form.heightUpSection;
const shelves = document.querySelector('.shelves');
const drawers = document.querySelector('.drawers');
const sink = document.querySelector('.sink');
const visibleSide = document.querySelector('.visible-side');
const kargo = document.querySelector('.kargo');
const oven = document.querySelector('.oven');
const microwave = document.querySelector('.microwave');
const hob = document.querySelector('.hob')
const fridge = document.querySelector('.fridge');
const dish = document.querySelector('.dish');
const dishwasher = document.querySelector('.dishwasher');
const backlight = document.querySelector('.backlight');
const neighboringWidth = document.querySelector('.neighboring');
const localItems = document.querySelectorAll('.local input')
const optionItems = document.querySelectorAll('.input__options input')
const optionsItem = form.querySelectorAll('.options__item');
const depth = form.depth;
const width = form.width;

tier.addEventListener('change', function() {
    typeCabineBottom.firstElementChild.selected = true;
    typeCabineTop.firstElementChild.selected = true;
    optionItems.forEach((item) => item.checked = false);
    form.leftSection.checked = false;
    form.drawers.value = 0;
    form.shelves.value = 0;
    if (this.value === "upSection") {
        localItems.forEach((item) => item.readOnly = false);
        optionsItem.forEach((item) => item.classList.add('hide'));
        typeTierBottom.classList.add('hide');
        typeTierTop.classList.remove('hide');
        shelves.classList.remove('hide');
        dish.classList.remove('hide');
        backlight.classList.remove('hide');
        depth.setAttribute('min', '200');
        depth.value = 300;
    } else {
        optionsItem.forEach((item) => item.classList.remove('hide'));
        depth.value = 600;
        typeTierTop.classList.add('hide');
        typeTierBottom.classList.remove('hide');
        neighboringWidth.classList.add('hide');
        microwave.classList.add('hide');
        fridge.classList.add('hide');
        dish.classList.add('hide');
        backlight.classList.add('hide');
        form.drawers.setAttribute('max', '6');
        form.shelves.setAttribute('min', '0');
    }
})
typeCabineBottom.addEventListener('change', function() {
    optionsItem.forEach((item) => item.classList.remove('hide'));
    localItems.forEach((item) => item.readOnly = false);
    optionItems.forEach((item) => item.checked = false);
    form.drawers.setAttribute('max', '6');
    form.shelves.setAttribute('min', '0');
    depth.setAttribute('min', '200');
    form.drawers.value = 0;
    form.shelves.value = 0;
    if (this.value === "originalBottomSection") {
        neighboringWidth.classList.add('hide');
        microwave.classList.add('hide');
        fridge.classList.add('hide');
        dish.classList.add('hide');
        backlight.classList.add('hide');  
    } else if (this.value === "cornerBottomSection") {
        drawers.classList.add('hide');
        kargo.classList.add('hide');
        oven.classList.add('hide');
        microwave.classList.add('hide');
        fridge.classList.add('hide');
        dish.classList.add('hide');
        dishwasher.classList.add('hide');
        backlight.classList.add('hide');
    }  else {
        neighboringWidth.classList.add('hide');
        sink.classList.add('hide');
        visibleSide.classList.add('hide');
        hob.classList.add('hide');
        kargo.classList.add('hide');
        dish.classList.add('hide');
        dishwasher.classList.add('hide');
        backlight.classList.add('hide');
        form.shelves.value = 1;
        form.shelves.setAttribute('min', '1');
        form.front.value = 1;
        form.front.readOnly = true;
    }
})
typeCabineTop.addEventListener('change', function() {
    optionsItem.forEach((item) => item.classList.add('hide'));
    shelves.classList.remove('hide');
    form.dish.checked = false;
    
    if (this.value === "originalTopSection") {
        dish.classList.remove('hide');
        backlight.classList.remove('hide');
    } else if (this.value === "cornerTopSection") {
        neighboringWidth.classList.remove('hide');
        dish.classList.remove('hide');
        backlight.classList.remove('hide');
    } else if (this.value === "cornerJoinSection") {
        dish.classList.remove('hide');
        backlight.classList.remove('hide');
    } 
})
heightTopSection.addEventListener('focus', function() {
    heightTopSection.value = (heightKitchen.value - heightDownSection.value - 600);
})
form.shelves.addEventListener('change', function() {
    if (this.value > 0 && typeCabineBottom.value !== "cupboardSection") {      
            form.drawers.value = 0;
            form.drawers.readOnly = true;
            kargo.classList.add('hide');
    } else {
        if (typeCabineBottom.value !== "cupboardSection") {
            form.drawers.readOnly = false;
            kargo.classList.remove('hide');
        }
    };
})
form.drawers.addEventListener('change', function() {
    if (this.value > 0) {
        form.front.value = 1;
        form.front.readOnly = true;
        
        if (typeCabineBottom.value !== "cupboardSection") {
            form.shelves.value = 0;
            form.shelves.readOnly = true;
            kargo.classList.add('hide');
            dishwasher.classList.add('hide');
            (this.value > 1) ? oven.classList.add('hide') : oven.classList.remove('hide');
        }
    } else {
        if (typeCabineBottom.value !== "cupboardSection") {
            form.front.readOnly = false;
            form.shelves.readOnly = false;
            kargo.classList.remove('hide');
            dishwasher.classList.remove('hide');
        }
    };
})
form.sink.addEventListener('change', function() {
    if (this.checked) {
        kargo.classList.add('hide');
        oven.classList.add('hide');
        dishwasher.classList.add('hide');
    } else {
        if (typeCabineBottom.value === "originalBottomSection") {
        kargo.classList.remove('hide');
        oven.classList.remove('hide');
        dishwasher.classList.remove('hide');
        }
    }
})
form.oven.addEventListener('change', function() {
    if (this.checked) {  
        width.value = 600
        width.readOnly = true;
        if (typeCabineBottom.value !== "cupboardSection") {
            depth.value = 600
            depth.readOnly = true;
            form.front.value = 1;
            form.front.readOnly = true;
            form.shelves.value = 0;
            form.shelves.readOnly = true;
            form.drawers.value = 1;
            form.drawers.readOnly = false;
            form.drawers.setAttribute('max', '1')
            sink.classList.add('hide');
            kargo.classList.add('hide');
            dishwasher.classList.add('hide');
        } else {
            fridge.classList.add('hide');
            depth.setAttribute('min', '580'); 
        }
    } else {
        form.drawers.setAttribute('max', '6')
        if (typeCabineBottom.value !== "cupboardSection") {
            width.readOnly = false;
            depth.readOnly = false;
            form.front.readOnly = false;
            form.shelves.readOnly = false;
            sink.classList.remove('hide');
            kargo.classList.remove('hide');
            dishwasher.classList.remove('hide');   
        } else {
            if (!form.microwave.checked) {
                depth.setAttribute('min', '200');
                width.readOnly = false;
                fridge.classList.remove('hide');
            }
        }
    };
})
form.microwave.addEventListener('change', function() {
    if (this.checked) {
        width.value = 600
        width.readOnly = true;
        fridge.classList.add('hide');
        depth.setAttribute('min', '580')
    } else {
        if (!form.oven.checked) {
            depth.setAttribute('min', '200'); 
            width.readOnly = false;
            fridge.classList.remove('hide');
        }
    }
})
form.fridge.addEventListener('change', function() {
    if (this.checked) {
        form.drawers.value = 0;
        drawers.classList.add('hide');
        oven.classList.add('hide');
        microwave.classList.add('hide');
        width.value = 600
        width.readOnly = true;
        depth.setAttribute('min', '580')
    } else {
        depth.setAttribute('min', '200'); 
        width.readOnly = false;
        drawers.classList.remove('hide');
        oven.classList.remove('hide');
        microwave.classList.remove('hide');
    }
})
form.dishwasher.addEventListener('change', function() {
    if (this.checked) {  
        width.value = form.dishwasherSize.value
        localItems.forEach((item) => item.readOnly = true);
        depth.value = 600
        form.front.value = 1;
        form.shelves.value = 0;
        form.drawers.value = 0;
        sink.classList.add('hide');
        oven.classList.add('hide');
        kargo.classList.add('hide');
        drawers.classList.add('hide');
    } else {
        localItems.forEach((item) => item.readOnly = false);
        drawers.classList.remove('hide');
        sink.classList.remove('hide');
        kargo.classList.remove('hide');
        oven.classList.remove('hide');   
    };
})
form.dishwasherSize.addEventListener('change', function() {
    if (form.dishwasher.checked) {
        width.value = this.value
    }
})
form.kargo.addEventListener('change', function() {
    if (this.checked) {
        form.drawers.value = 0;
        form.shelves.value = 0;
        form.shelves.readOnly = true;
        form.front.value = 1;
        form.front.readOnly = true;
        drawers.classList.add('hide');
        oven.classList.add('hide');
        sink.classList.add('hide');
        dishwasher.classList.add('hide');
    } else {
        form.shelves.readOnly = false;
        form.front.readOnly = false;
        drawers.classList.remove('hide');
        oven.classList.remove('hide');
        sink.classList.remove('hide');
        dishwasher.classList.remove('hide');
    }
})
function getValue() {
    let countertopThickness, plinth, kitchenHeight, sectionHeight, sectionUpHeight, 
    sectionWidth, sectionDepth, neighboringSectionWidth;

    countertopThickness = form.countertopThickness;
    plinth = form.plinth;

    kitchenHeight = +form.heightKitchen.value;
    sectionHeight = heightDownSection.value - countertopThickness.value - plinth.value;
    sectionUpHeight = (form.heightKitchen.value - form.heightDownSection.value - 600);

    sectionWidth = +form.sectionWidth.value;
    sectionDepth = +form.depth.value;

    neighboringSectionWidth = form.neighboringWidth.value

    let sectionType = (form.tier.value === "upSection") 
        ? `${form.typeTierTop.value}` 
        : `${form.typeTierBottom.value}`;

    let dimensions = [kitchenHeight, sectionHeight, sectionUpHeight, sectionWidth, 
        sectionDepth, neighboringSectionWidth, sectionType];
    return dimensions
}
btn.addEventListener('click', (event) => {
    const shelvesMin = form.shelves.getAttribute('min')
    event.preventDefault();
    let sectionDimensions = new SectionDimensions(...getValue());
    sectionDimensions.createSection()
    drawers.classList.remove('hide');
    optionItems.forEach((item) => item.checked = false);
    localItems.forEach((item) => item.readOnly = false);
    form.drawers.setAttribute('max', '6');
    form.neighboringWidth.value = 0;
    form.drawers.value = 0;
    form.shelves.value = shelvesMin;
})