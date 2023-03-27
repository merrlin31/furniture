import { SectionView } from "./section_view.js";
import { dataService } from "./data_service.js";

const formPrice = document.forms.setttingsForm1;

export class SectionsListView {
    constructor(element) {
        this.element = element;
    }
    drawTotalList() {
        let input = ['.specification__input1', '.specification__input2', 'assembly', 'delivery', 'gasoline'];
        let i = 0;
        let content = {};
        for (let item of input) {
            if (item === 'delivery') {
                content.sum = +formPrice.delivery.value;
                content.discountSum = 0;
                content.totalSum = content.sum - content.discountSum;
            } else if (item === 'assembly') {
                content.sum = ((+document.querySelector('.total-material__sum').textContent + +document.querySelector('.total-furniture__sum').textContent) / 10).toFixed(2);
                content.discountSum = 0;
                content.totalSum = content.sum - content.discountSum;
            } else if (item === 'gasoline') {
                content.sum = 300;
                content.discountSum = 0;
                content.totalSum = content.sum - content.discountSum;
            } else {
                let table = document.querySelector(`${item}`);
                content.sum = (table.children.length > 0) ? document.querySelector(`${item} .sum`).textContent : 0;
                content.discountSum = (table.children.length > 0) ? document.querySelector(`${item} .discount-sum`).textContent : 0;
                content.totalSum = content.sum - content.discountSum;
            }
            let input = document.querySelector('.specification__input3');
            let j = 1;
            for (let key in content) {
                input.children[i].children[j].textContent = content[key];
                j++
            }
            i++
        }
        this.createSum(document.getElementById('specificationInput3'));
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
            if (this.element.classList.contains('specification__input1')) section.createSpecification(this.element);
            if (this.element.classList.contains('specification__input2')) section.createSpecificationFurniture(this.element);
        });
        if (this.element.classList.contains('specification__input1')) {
            this.createService(this.element, +dataService.services.cutting.toFixed(2), "Порізка ДСП", formPrice.cutting.value);
            this.createService(this.element, +dataService.services.dvpCutting.toFixed(2), "Порізка ДВП", formPrice.dvpCutting.value);
            this.createService(this.element, +dataService.services.tabletopCutting.toFixed(2), "Порізка стільниць", formPrice.tabletopCutting.value);
            this.createService(this.element, +dataService.services.edging.toFixed(2), "Кромкування деталей", formPrice.edging.value);
            this.createService(this.element, +dataService.services.tabletopEdging.toFixed(2), "Кромкування стільниці", formPrice.tabletopEdging.value);
            this.createService(this.element, +dataService.services.tabletopLock.toFixed(2), "З'єднання стільниці", formPrice.tabletopLock.value);
            this.createService(this.element, +dataService.services.ledGroove.toFixed(2), "Паз під LED", formPrice.ledGroove.value);
            this.createService(this.element, +dataService.services.dvpGroove.toFixed(2), "Паз під ДВП", formPrice.dvpGroove.value);
            this.createService(this.element, +dataService.services.millingCut.toFixed(2), "Фрезерний різ", formPrice.millingCut.value);
            this.createService(this.element, +dataService.services.millingCutMin.toFixed(2), "Фрезерний різ мінімальний", formPrice.millingCutMin.value);
            this.createService(this.element, +dataService.services.millingCutTabletop.toFixed(2), "Фрезерний різ на стільниці", formPrice.millingCutTabletop.value);
            this.createService(this.element, +dataService.services.drilling.toFixed(2), "Свердління отворів", formPrice.drilling.value);
            this.createService(this.element, +dataService.services.numberHinges.toFixed(2), "Свердління під завіси", formPrice.numberHinges.value);
        }
        this.createSum(this.element);
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
            discount: 0,
        }
        tr = document.createElement('tr');
        for (let key in service) {
            if (key === 'discount') continue;
            td = document.createElement('td');
            td.textContent = service[key];
            tr.append(td);
        }
        let section = new SectionView();
        section.createTotalPrice(service, tr)
        if (service.amount !== 0.00) element.append(tr)
    }

    createSum(element) {
        let allTr = element.querySelectorAll('tr');
        if (allTr.length === 0) return;
        let sum = 0;
        let discountSum = 0;
        let totalSum = 0;
        for (let i = 0; i < allTr.length; i++) {
            sum += +allTr[i].children[allTr[i].children.length - 3].textContent;
            discountSum += +allTr[i].children[allTr[i].children.length - 2].textContent;
            totalSum += +allTr[i].children[allTr[i].children.length - 1].textContent;
        }
        let tr = document.createElement('tr');
        if (document.querySelector('.specification__input3 .specification__sum')) 
            document.querySelector('.specification__input3 .specification__sum').remove();
        tr.classList.add('specification__sum')

        for (let item of allTr[0].children) {
            let td = document.createElement('td');
            tr.append(td);
        }
        let child = tr.children[tr.children.length - 3];
        let discountChild = tr.children[tr.children.length - 2];
        child.textContent = sum.toFixed(2);
        child.classList.add('sum');
        discountChild.textContent = discountSum.toFixed(2);
        discountChild.classList.add('discount-sum');
        tr.lastChild.textContent = totalSum.toFixed(2);
        tr.lastChild.classList.add('total-sum');
        element.append(tr);
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
    drawAllMaterial(array) {
        let allMaterials = [];
        let materials = array;
        if (materials.length === 0) return;
        materials.forEach(material => {
            allMaterials.push(new SectionView(material))
        });
        this.drawSpecification(allMaterials);
    }
}