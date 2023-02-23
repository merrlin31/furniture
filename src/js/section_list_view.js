import { SectionView } from "./section_view.js";
import { dataService } from "./section.js";

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
        this.createService(this.element, dataService.services.cutting, "Порізка ДСП", 9.96);
        this.createService(this.element, dataService.services.dvpCutting, "Порізка ДВП", 5.10);
        this.createService(this.element, dataService.services.tabletopCutting, "Порізка стільниць", 34.56);
        this.createService(this.element, dataService.services.edging, "Кромкування деталей", 21.30);
        this.createService(this.element, dataService.services.tabletopEdging, "Кромкування стільниці", 97.50);
        this.createService(this.element, dataService.services.tabletopLock, "З'єднання стільниці", 385.92);
        this.createService(this.element, dataService.services.ledGroove, "Паз під LED", 21.42);
        this.createService(this.element, dataService.services.dvpGroove, "Паз під ДВП", 21.42);
        this.createService(this.element, dataService.services.millingCut, "Фрезерний різ", 55.26);
        this.createService(this.element, dataService.services.millingCutTabletop, "Фрезерний різ на стільниці", 66.24);
        this.createService(this.element, dataService.services.drilling, "Свердління отворів", 3.00);
        this.createService(this.element, dataService.services.numberHinges, "Свердління під завіси", 5.46);
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
        if (service.amount !== 0) element.append(tr)
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