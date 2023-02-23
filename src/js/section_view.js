import { dataService } from "./section.js";

const form = document.forms.inputForm;

export class SectionView {
    constructor(section) {
        this.section = section;
        this.tbody = null;
    }
    createIn(element) {
        this.tbody = document.createElement("tbody");
        let allDetail = this.section;
        for (let i = 0; i < allDetail.length; i++) {
            let tr = document.createElement('tr');
            for (let j = 0; j < allDetail[i].length; j++) {
                for (let k = 0; k < allDetail[i][j].length; k++) {
                    if (allDetail[i][0][0] === 0 || allDetail[i][1][0] === 0) continue
                    let td = document.createElement('td');
                    td.textContent = allDetail[i][j][k];
                    tr.append(td);
                }
            }
        this.tbody.append(tr)
        }
        if (this.section.leftSection) {
            this.tbody.classList.add("leftSection");
        }
        element.innerHTML += this.tbody.innerHTML;
        if (element.innerHTML !== "undefined" ) element.lastElementChild.classList.add('detailing__section-end')
    }
    
    createSpecification(element) {
        this.tbody = document.createElement("tbody");
        let tr, td;
        let amount = (this.section.material === "ДСП" || this.section.material === "ДВП") ? Math.ceil(this.section.area / 5.3) : this.section.area
        if (this.section.material === "Стільниця") {
            amount = 0;
            dataService.allMaterials.leftTabletops.forEach(item => {
                amount += item[0][0]
            })
            dataService.allMaterials.rightTabletops.forEach(item => {
                amount += item[0][0]
            })
            amount = Math.ceil(amount / (form.tabletopLength.value - 32))
        }
        let material = {
            materialCode: this.section.materialCode,
            material: this.section.material,
            amount: amount,
            price: this.section.price,
        }
        let boldEdge = {
            materialCode: "",
            material: 'Товста кромка',
            amount: Math.ceil(this.section.boldEdge),
            price: 10,
        }
        let thinEdge = {
            materialCode: "",
            material: 'Тонка кромка',
            amount: Math.ceil(this.section.thinEdge),
            price: 7,
        }
        let arr = [material, boldEdge, thinEdge];
        for (let item of arr) {
            tr = document.createElement('tr');
            for (let key in item) {
                td = document.createElement('td');
                td.textContent = item[key];
                tr.append(td);
            }
            td = document.createElement('td');
            td.textContent = (item.amount * item.price).toFixed(2);
            tr.append(td);
            if (item.amount !== 0) this.tbody.append(tr)
        }
        element.innerHTML += this.tbody.innerHTML;
    }
}