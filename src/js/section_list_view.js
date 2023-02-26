import { SectionView } from "./section_view.js";
import { dataService } from "./section.js";

const formPrice = document.forms.setttingsForm1;

export class SectionsListView {
    constructor(element) {
        this.element = element;
    }
    drawList(allDetails) {
        this.element.innerHTML = "";
        allDetails.forEach(section => {
            section.createIn(this.element);
        });
        if (this.element.classList.contains('detailing__input1')) this.createPlinth(this.element);
    }
    drawSpecification(allMaterials) {
        this.element.innerHTML = "";
        allMaterials.forEach(section => {
            section.createSpecification(this.element);
        });
        this.createService(this.element, +dataService.services.cutting.toFixed(2), "Порізка ДСП", formPrice.cutting.value);
        this.createService(this.element, +dataService.services.dvpCutting.toFixed(2), "Порізка ДВП", formPrice.dvpCutting.value);
        this.createService(this.element, +dataService.services.tabletopCutting.toFixed(2), "Порізка стільниць", formPrice.tabletopCutting.value);
        this.createService(this.element, +dataService.services.edging.toFixed(2), "Кромкування деталей", formPrice.edging.value);
        this.createService(this.element, +dataService.services.tabletopEdging.toFixed(2), "Кромкування стільниці", formPrice.tabletopEdging.value);
        this.createService(this.element, +dataService.services.tabletopLock.toFixed(2), "З'єднання стільниці", formPrice.tabletopLock.value);
        this.createService(this.element, +dataService.services.ledGroove.toFixed(2), "Паз під LED", formPrice.ledGroove.value);
        this.createService(this.element, +dataService.services.dvpGroove.toFixed(2), "Паз під ДВП", formPrice.dvpGroove.value);
        this.createService(this.element, +dataService.services.millingCut.toFixed(2), "Фрезерний різ", formPrice.millingCut.value);
        this.createService(this.element, +dataService.services.millingCutTabletop.toFixed(2), "Фрезерний різ на стільниці", formPrice.millingCutTabletop.value);
        this.createService(this.element, +dataService.services.drilling.toFixed(2), "Свердління отворів", formPrice.drilling.value);
        this.createService(this.element, +dataService.services.numberHinges.toFixed(2), "Свердління під завіси", formPrice.numberHinges.value);
    }

    createPlinth(element) {
        let tr, td;
        let plinth = dataService.allMaterials.plinth;
        for (let key in plinth) {
            let item = plinth[key]
            tr = document.createElement('tr');
            for (let i = 0; i < item.length; i++) {
                for (let j = 0; j < item[i].length; j++) {
                    td = document.createElement('td');
                    td.textContent = item[i][j];
                    tr.append(td);
                }
            }
            if (item[0][0] !== 0) element.append(tr)
        }
    }

    createService(element, amount, description, price) {
        let tr, td;
        let service = {
            materialCode: "",
            material: description,
            amount: amount,
            price: price,
        }
        tr = document.createElement('tr');
        for (let key in service) {
            td = document.createElement('td');
            td.textContent = service[key];
            tr.append(td);
        }
        td = document.createElement('td');
        td.textContent = service.amount * service.price;
        tr.append(td);
        if (service.amount !== 0.00) element.append(tr)
    }

    drawAll(allDetails) {
        let allSections = [];
        let sections = allDetails;
        if (sections.length === 0) return;
        sections.forEach(section => {
            allSections.push(new SectionView(section))
        });
        this.drawList(allSections);
    }
    drawAllMaterial() {
        let allMaterials = [];
        let materials = dataService.saveMaterials;
        if (materials.length === 0) return;
        materials.forEach(material => {
            allMaterials.push(new SectionView(material))
        });
        this.drawSpecification(allMaterials);
    }
}