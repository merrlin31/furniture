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
    }
    drawSpecification(allMaterials) {
        this.element.innerHTML = "";
        allMaterials.forEach(section => {
            section.createSpecification(this.element);
        });
        this.createService(this.element, dataService.cutting, "Порізка ДСП", 9.96);
        this.createService(this.element, dataService.dvpCutting, "Порізка ДВП", 5.1);
        this.createService(this.element, dataService.ledGroove, "Паз під LED", 21.42);
        this.createService(this.element, dataService.dvpGroove, "Паз під ДВП", 21.42);
        this.createService(this.element, dataService.drilling, "Свердління отворів", 3.00);
        this.createService(this.element, dataService.numberHinges, "Свердління під завіси", 5.46);
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
        let materials = dataService.allMaterials;
        if (materials.length === 0) return;
        materials.forEach(material => {
            allMaterials.push(new SectionView(material))
        });
        this.drawSpecification(allMaterials);
    }
}