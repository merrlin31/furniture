import { addUsedFurniture, sectionListView1, sectionListView2, 
    sectionListView3, sectionListView4, sectionSpecification1, sectionSpecification2 } from "./section.js"
import { sectionCounter, drawCounter } from "./sections_counter.js";

const input = document.querySelectorAll('.indent__item input')
let projectTitle = document.getElementById('headerInput');
const form = document.forms.inputForm;

export let dataService = {
    
    allProject: {},
    allMaterials: {
        sections: [],
        fronts: [],
        dvps: [],
        leftTabletops: [],
        rightTabletops: [],
        plinth: {},
    },
    services: {
        cutting: 0,
        dvpCutting: 0,
        tabletopCutting: 0,
        edging: 0,
        tabletopEdging: 0,
        tabletopLock: 0,
        ledGroove: 0,
        dvpGroove: 0,
        millingCut: 0,
        millingCutMin: 0,
        millingCutTabletop: 0,
        drilling: 0,
        numberHinges: 0,
    },
    materials: [],
    counter: {
        allSectionCounter: 0,
        leftBottomSectionCounter: 0,
        rightBottomSectionCounter: 0,
        leftTopSectionCounter: 0,
        rightTopSectionCounter: 0,
    },
    constant: {},
    addedFurniture: [],
    usedFurniture: {
        numberHinges: {
            value: 0,
            description: 'Завіси'
        },
        numberDrawers: {
            value: 0,
            description: 'Направляючі'
        },
        kargo: {
            value: 0,
            description: 'Карго'
        },
        sink: {
            value: 0,
            description: 'Мийка'
        },
        dish: {
            value: 0,
            description: 'Сушка'
        },
        legs: {
            value: 0,
            description: 'Ніжки'
        },
        hooks: {
            value: 0,
            description: 'Навіси'
        },
        rail: {
            value: 0,
            description: 'Шина для навісів'
        },
        ledLenght: {
            value: 0,
            description: 'LED підсвітка'
        },
        plinthSeal: {
            value: 0,
            description: 'Цокольний ущільнювач'
        },
        confirmats: {
            value: 0,
            description: 'Конфірмати'
        },
        shelfHolder: {
            value: 0,
            description: 'Полицетримачі'
        },
        golaL: {
            value: 0,
            description: 'Gola тип L'
        },
        golaC: {
            value: 0,
            description: 'Gola тип C'
        },
        handle: {
            value: 0,
            description: 'Ручки'
        },
        push: {
            value: 0,
            description: 'Push to open'
        },
        selfTapping15: {
            value: 0,
            description: 'Саморізи 3,5x15'
        },
        selfTapping30: {
            value: 0,
            description: 'Саморізи 3,5x30'
        },
        screw40: {
            value: 0,
            description: 'Гвинт 4x40'
        },
        connectionBar: {
            value: 0,
            description: "З'єднання стільниці"
        },
    },

    get allSections() {
        return this.allMaterials.sections;
    },

    get allFronts() {
        return this.allMaterials.fronts;
    },

    get allDvp() {
        return this.allMaterials.dvps;
    },

    get allTabletop() {
        let tabletops = [];
        tabletops.push(this.allMaterials.leftTabletops);
        tabletops.push(this.allMaterials.rightTabletops);
        return tabletops;
    },

    get saveMaterials() {
        return this.materials;
    },

    addDetails(section, material) {
        if (section.length > 0) this.allMaterials.sections.push(section);
        this.findDuplicate(material);
        this.services.edging += material.commonEdge;
        this.services.drilling += material.drilling;
        this.services.ledGroove += material.ledGroove;
        this.services.dvpGroove += material.dvpGroove;
        this.services.cutting += material.cutting;
        this.services.millingCut += material.millingCut;
        this.services.millingCutMin += material.millingCutMin;
        this.save();
    },

    addFronts(front, frontMaterial) {
        this.allMaterials.fronts.push(front);
        this.findDuplicate(frontMaterial);
        this.services.numberHinges += frontMaterial.drilling;
        if (frontMaterial.material === "ДСП") {
            this.services.cutting += frontMaterial.cutting;
            this.services.edging += frontMaterial.commonEdge;
        }
        this.save();
    },

    addDvps(dvp, dvpMaterial) {
        if (dvp.length > 0) this.allMaterials.dvps.push(dvp);
        this.findDuplicate(dvpMaterial);
        this.services.dvpCutting += dvpMaterial.dvpCutting;
        this.save();
    },

    addPlinth(plinth, plinthMaterial) {
        if (form.tier.value === "downSection") {
            if (JSON.stringify(this.allMaterials.plinth) === '{}') {
                this.allMaterials.plinth = plinth;
            } else {
                this.allMaterials.plinth.leftSection[0][0] += plinth.leftSection[0][0];
                this.allMaterials.plinth.rightSection[0][0] += plinth.rightSection[0][0];
            }
        }
        this.findDuplicate(plinthMaterial);
        this.services.edging += plinthMaterial.commonEdge;
        this.services.cutting += plinthMaterial.cutting;
        this.save();
    },

    addTabletops(tabletop, tabletopMaterial) {
        if (form.tier.value === "downSection") {
            this.services.tabletopCutting = 0
            this.addTabletop(this.allMaterials.leftTabletops, tabletop.leftSection);
            this.addTabletop(this.allMaterials.rightTabletops, tabletop.rightSection);
            this.findDuplicate(tabletopMaterial);
            this.services.millingCutTabletop += tabletopMaterial.millingCut;
            this.services.tabletopEdging += tabletopMaterial.commonEdge;
            if (this.allMaterials.leftTabletops.length > 0 && this.allMaterials.rightTabletops.length > 0) this.services.tabletopLock = 1;
        }
        this.save();
    },

    addTabletop(array, tabletop) {
        if (array.length === 0) {
            if (tabletop[0][0] !== 0) array[0] = tabletop;
        } else {
            let i = array.length - 1
            if (array[i][0][0] === 0) array[i][1][0] = tabletop[1][0];
            if (array[i][1][0] < 600) array[i][3][0] = tabletop[3][0];
            
            if ((array[i][0][0] + tabletop[0][0]) > +form.tabletopLength.value) {
                array.push(tabletop)
                i = array.length - 1
                array[i][3][2] = 1;
                array[i][3][3] = 1;
            
            } else {
                array[i][0][0] += tabletop[0][0];
            }
        }
        this.services.tabletopCutting += array.length * 1.2;
        if (array.length > 0) {
            if (array[0][1][0] < 600) {
                array.forEach (item => {
                    this.services.tabletopCutting += item[0][0] / 1000;
                })
                
            }
        }
    },

    addUsedFurniture(furniture) {
        for (let key in this.usedFurniture) {
            if (key !== 'connectionBar') this.usedFurniture[key].value += furniture[key]
        }
        if (this.allMaterials.leftTabletops.length > 0) this.usedFurniture.connectionBar.value = (this.allMaterials.leftTabletops.length - 1)
        if (this.allMaterials.leftTabletops.rightTabletops > 0) this.usedFurniture.connectionBar.value += (this.allMaterials.rightTabletops.length - 1)
        this.save();
    },

    addAddedFurniture(furniture) {
        this.addedFurniture.push(furniture);
        this.save();
    },

    addCounter(counters) {
        let i = 0;
        for (let key in this.counter) {
            this.counter[key] = counters[i]
            i++
        }
        this.save();
    },

    addConstant(constants) {
        this.constant = constants
        this.save()
    },

    findDuplicate(material) {
        let duplicateMaterial = this.materials.find(item => item.materialCode === material.materialCode)
        if (duplicateMaterial) {
            for (let item in duplicateMaterial) {
                if (item !== 'materialCode' && item !== 'price' && item !== 'material' && item !== 'drilling') { 
                    duplicateMaterial[item] += material[item]
                }  
            }
        } else {
            this.materials.push(material);
        }
    },

    addSettings() {
        input.forEach(item => {
            item.value = this.constant[item.id];
        })
    },

    save() {
        this.allProject.allMaterials = this.allMaterials;
        this.allProject.services = this.services;
        this.allProject.materials = this.materials;
        this.allProject.counter = this.counter;
        this.allProject.constant = this.constant;
        this.allProject.usedFurniture = this.usedFurniture;
        this.allProject.addedFurniture = this.addedFurniture;
        localStorage.setItem(projectTitle.value, JSON.stringify(this.allProject));
    },

    open() {
        this.allProject = JSON.parse(localStorage.getItem(projectTitle.value)) || [];
        this.allMaterials = this.allProject.allMaterials;
        this.services = this.allProject.services;
        this.materials = this.allProject.materials;
        this.counter = this.allProject.counter;
        this.constant = this.allProject.constant;
        this.usedFurniture = this.allProject.usedFurniture;
        this.addedFurniture = this.allProject.addedFurniture;
        addUsedFurniture();
        sectionListView1.drawAll(dataService.allSections);
        sectionListView2.drawAll(dataService.allFronts);
        sectionListView3.drawAll(dataService.allDvp);
        if (this.allTabletop[0].length > 0 || this.allTabletop[1].length > 0) sectionListView4.drawAll(dataService.allTabletop);
        sectionSpecification1.drawAllMaterial(dataService.saveMaterials);
        sectionSpecification2.drawAllMaterial(dataService.addedFurniture);
        sectionCounter();
        this.addSettings();
    },

    reset() {
        this.allMaterials.sections = []
        this.allMaterials.fronts = []
        this.allMaterials.dvps = []
        this.allMaterials.leftTabletops = []
        this.allMaterials.rightTabletops = []
        this.allMaterials.plinth = {}
        this.materials = []
        for (let key in this.usedFurniture) {
            this.usedFurniture[key].value = 0;
        }
        for (let key in this.services) {
            this.services[key] = 0;
        }
        for (let key in this.counter) {
            this.counter[key] = 0;
        }
        addUsedFurniture();
        drawCounter();
        localStorage.removeItem(projectTitle.value);
        detailingInput1.innerHTML = "";
        detailingInput2.innerHTML = "";
        detailingInput3.innerHTML = "";
        detailingInput4.innerHTML = "";
        specificationInput1.innerHTML = "";
    },
}

let saveBtn = document.getElementById('saveProject');
let loadBtn = document.getElementById('loadProject');
let resetBtn = document.getElementById('resetProject');

saveBtn.addEventListener('click', () => {
    dataService.save()
});
loadBtn.addEventListener('click', () => {
    dataService.open()
});   
resetBtn.addEventListener('click', () => {
    dataService.reset()
});