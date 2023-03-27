import { sectionSpecification2 } from "./section.js";
import { dataService } from "./data_service.js";

const form = document.addFurniture

class Furniture {
    constructor(code, name, manufacturer, discount) {
        this.code = code;
        this.name = name;
        this.manufacturer = manufacturer;
        this.discount = discount;
        // this.id = furniture.length + 1;
    }

    addPhoto(path) {
        let div = document.createElement('div');
        let img = document.createElement('img');
        img.setAttribute("src", `img/${path}.jpg`);
        img.setAttribute("alt", this.name);
        div.append(img)
        return img.outerHTML;
    }
}

class AddedFurniture extends Furniture {
    constructor(code, name, manufacturer, discount) {
        super(code, name, manufacturer, discount);
        this.amount = +form.amount.value;
        this.price = +form.price.value;
    }
} 
let recomendFurniture = [
    [23913, "Завіса з дотягувачем", "muller"],
    [97747, "Завіса рівнолежача з дотягувачем", "muller"],
    [96053, "Завіса зичайна", "muller"],
    [97744, "Завіса P2O", "muller"],
    [78151, "Направляючі с дотягувачем 500 мм", "hettich"],
    [78136, "Направляючі PushToOpen 500 мм", "hettich"],
    [13592, "Механізм PushOpen", "muller"],
    [13596, "Планка для PushOpen", "muller"],
    [52680, "Шина для навісів", "ukraine"],
    [59640, "Навіс Camar", "camar"],
    [85056, "Ніжки", "muller"],
    [85059, "Кліпса до ніжки", "muller"],
    [31837, "Обмежувач відкривання", "hafele"],
    [81885, "Цокольний ущільнювач", "termoplast"],
    [87377, "Решітка вентиляційна", "poland"],
    [80399, "Амортизатор газовий", "china"],
    [52559, "Конфірмати", "china"],
    [52636, "Полицетримачі", "china"],
    [11358, "Саморізи 3,5x15", "muller"],
    [11360, "Саморізи 3,5x30", "muller"],
    [52600, "Гвинт 4x40", "china"],
    [61281, "Мініфікс", "hettich"],
    [57722, "Дюбель під мініфікс", "hettich"],
    [82308, "З'єднання стільниці", "china"]
]
let furniture = [];
let discount = {
    muller: 15,
    hettich: 20,
    china: 25,
    camar: 15,
    termoplast: 15,
    ukraine: 25,
    poland: 18,
    hafele: 9,
}
function fillRecomendFurniture() {

    let furnitureItem
    recomendFurniture.forEach(item => {
        furnitureItem = new Furniture(item[0], item[1], item[2], discount[item[2]])
        furniture.push(furnitureItem)
    })

    let input = document.querySelector('.recomend__inputs');
    for (let item of furniture) {
        let recomendItem = document.createElement('div');
        recomendItem.classList.add('recomend__item');
        let img = document.createElement('div');
        img.classList.add('recomend__img');
        img.innerHTML = item.addPhoto(item.code);
        recomendItem.append(img);
        let code = document.createElement('div');
        code.classList.add('recomend__code');
        code.textContent = item.code;
        recomendItem.append(code);
        let name = document.createElement('div');
        name.classList.add('recomend__name');
        name.textContent = item.name;
        recomendItem.append(name);
        input.append(recomendItem)
    }
}

fillRecomendFurniture()

export function addFurniture(event) {
    event.preventDefault();
    let furniture = new AddedFurniture(form.code.value, form.name.value, form.manufacturer.value, discount[form.manufacturer.value]);
    dataService.addAddedFurniture(furniture);
    if (dataService.addedFurniture.length > 0) document.querySelector('.specification__furniture').classList.remove('hide')
    sectionSpecification2.drawAllMaterial(dataService.addedFurniture);
    document.querySelector('.specification__total').classList.remove('hide');
    sectionSpecification2.drawTotalList();
}


const recomendInput = document.querySelector('.recomend__inputs');
const addFurnitureBtn = document.querySelector('.add__button');

recomendInput.addEventListener('click', event => {
    let recomendFurniture
    if (event.target.classList.contains('recomend__name'))
        recomendFurniture = furniture.find(item => item.name === event.target.textContent);
    if (event.target.classList.contains('recomend__code'))
        recomendFurniture = furniture.find(item => item.code == event.target.textContent);  
    form.name.value = recomendFurniture.name;
    form.code.value = recomendFurniture.code;
    form.manufacturer.value = recomendFurniture.manufacturer;
    form.price.value = '';
    form.amount.value = 0;
    let usedFurniture
    for (let key in dataService.usedFurniture) {
        if (dataService.usedFurniture[key].description === recomendFurniture.name) 
        usedFurniture = dataService.usedFurniture[key]
    }
    if (usedFurniture) form.amount.value = usedFurniture.value;
})

addFurnitureBtn.addEventListener('click', addFurniture)
