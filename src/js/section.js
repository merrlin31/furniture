import { Detail } from "./detail.js";
import { Material } from "./material.js";
import { SectionsListView } from "./section_list_view.js";
import { constants } from "./constants.js";
import { Dvp } from "./dvp.js";
import { sectionCounter } from "./sections_counter.js";

const form = document.forms.inputForm;
let projectTitle = document.getElementById('headerInput');
const input = document.querySelectorAll('.indent__item input')
const priceBtn = document.forms.setttingsForm1.priceButton;

export const type = {
    downSection: {
        name: 'Нижня шафа',
        originalBottomSection: {
            name: 'Звичайна шафа',
        },
        cornerBottomSection: {
            name: 'Кутова шафа',
        },
        cupboardSection: {
            name: 'Велика шафа',
        },
    },
    upSection: {
        name: 'Верхня шафа',
        originalTopSection: {
            name: 'Звичайна шафа',
        },
        hoodSection: {
            name: 'Шафа з витяжкою',
        },
        cornerTopSection: {
            name: 'Кутова шафа',
        },
        cornerJoinSection: {
            name: 'Кутова шафа з фальш-панелю',
        },
    },
}
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
        tabletops.push(this.allMaterials.rightTabletops)
        return tabletops;
    },

    get saveMaterials() {
        return this.materials;
    },

    addDetails(section, material) {
        if (section.length > 0) this.allMaterials.sections.push(section);
        this.services.edging += material.commonEdge;
        this.services.drilling += material.drilling;
        this.services.ledGroove += material.ledGroove;
        this.services.dvpGroove += material.dvpGroove;
        this.services.cutting += material.cutting;
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
        this.services.millingCut += plinthMaterial.millingCut;
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
        localStorage.setItem(projectTitle.value, JSON.stringify(this.allProject));
    },

    open() {
        this.allProject = JSON.parse(localStorage.getItem(projectTitle.value)) || [];
        this.allMaterials = this.allProject.allMaterials;
        this.services = this.allProject.services;
        this.materials = this.allProject.materials;
        this.counter = this.allProject.counter;
        this.constant = this.allProject.constant;
        sectionListView1.drawAll(dataService.allSections);
        sectionListView2.drawAll(dataService.allFronts);
        sectionListView3.drawAll(dataService.allDvp);
        sectionListView4.drawAll(dataService.allTabletop);
        sectionSpecification1.drawAllMaterial();
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
        for (let key in this.services) {
            this.services[key] = 0;
        }
        for (let key in this.counter) {
            this.counter[key] = 0;
        }
        localStorage.removeItem(projectTitle.value);
        detailingInput1.innerHTML = "";
        detailingInput2.innerHTML = "";
        detailingInput3.innerHTML = "";
        detailingInput4.innerHTML = "";
        specificationInput1.innerHTML = "";
    },
}
export class SectionDimensions {
    constructor(kitchenHeight, sectionHeight, sectionUpHeight, sectionWidth, 
        sectionDepth, neighboringSectionWidth, sectionType) {
        this.kitchenHeight = kitchenHeight;
        this.sectionHeight = sectionHeight;
        this.sectionUpHeight = sectionUpHeight;
        this.sectionWidth = sectionWidth;
        this.sectionDepth = sectionDepth;
        this.neighboringSectionWidth = neighboringSectionWidth;
        this.sectionType = sectionType;
        this.leftSection = form.leftSection.checked;
    }
    getSectionDimensions() {

        let washEdge = (form.sink.checked) ? 1 : 0;
        let oven = form.oven.checked ? this.sectionDepth - constants.constant('indentCountertop') : constants.constant('partition');
        let quantity = 1;
        
        type.downSection.originalBottomSection.dimensions = [
            [[this.sectionHeight - constants.constant('materialWidth')], [this.sectionDepth - constants.constant('indentCountertop')], [quantity], [1, washEdge, 0, 0]], 
            [[this.sectionHeight - constants.constant('materialWidth')], [this.sectionDepth - constants.constant('indentCountertop')], [quantity], [1, washEdge, 0, 0]], 
            [[this.sectionWidth], [this.sectionDepth - constants.constant('indentCountertop')], [quantity], [1, washEdge, 1, 1]], 
            [[this.sectionWidth - constants.constant('materialWidth') * 2], [oven], [quantity], [1, 0, 0, 0]],
        ];
        type.downSection.cornerBottomSection.dimensions = [
            [[this.sectionHeight - constants.constant('materialWidth')], [this.sectionDepth - constants.constant('indentCountertop')], [quantity], [1, washEdge, 0, 0]], 
            [[this.sectionHeight - constants.constant('materialWidth')], [this.sectionDepth - constants.constant('indentCountertop')], [quantity], [1, washEdge, 0, 0]], 
            [[this.sectionWidth - constants.constant('indentWall')], [this.sectionDepth - constants.constant('indentCountertop')], [quantity], [1, washEdge, 1, 1]], 
            [[this.sectionWidth - constants.constant('materialWidth') * 2 - constants.constant('indentWall')], [70], [quantity], [1, 0, 0, 0]],
        ];
        type.downSection.cupboardSection.dimensions = [
            [[this.kitchenHeight], [this.sectionDepth - constants.constant('indentCupboard')], [quantity], [1, 1, 1, 1]], 
            [[this.kitchenHeight], [this.sectionDepth - constants.constant('indentCupboard')], [quantity], [1, 1, 1, 1]], 
            [[this.sectionWidth - constants.constant('materialWidth') * 2], [this.sectionDepth - constants.constant('indentCountertop')], [quantity], [1, 0, 0, 0]], 
            [[this.sectionWidth - constants.constant('materialWidth') * 2], [this.sectionDepth - constants.constant('indentCountertop')], [quantity], [1, 0, 0, 0]],
        ];
        type.upSection.originalTopSection.dimensions = [
            [[this.sectionUpHeight - constants.constant('materialWidth')], [this.sectionDepth], [quantity], [1, 0, 0, 1]], 
            [[this.sectionUpHeight - constants.constant('materialWidth')], [this.sectionDepth], [quantity], [1, 0, 0, 1]], 
            [[this.sectionWidth], [this.sectionDepth], [quantity], [1, 0, 1, 1]], 
            [[this.sectionWidth - constants.constant('materialWidth') * 2], [this.sectionDepth - constants.constant('indentBackside')], [quantity], [1, 0, 0, 0]],
        ];
        type.upSection.hoodSection.dimensions = [
            [[this.sectionUpHeight - constants.constant('indentHood')], [this.sectionDepth], [quantity], [1, 0, 1, 1]], 
            [[this.sectionUpHeight - constants.constant('indentHood')], [this.sectionDepth], [quantity], [1, 0, 1, 1]], 
            [[this.sectionWidth - constants.constant('materialWidth') * 2], [this.sectionDepth], [quantity], [1, 0, 0, 0]], 
            [[this.sectionWidth - constants.constant('materialWidth') * 2], [this.sectionDepth - constants.constant('indentBackside')], [quantity], [1, 0, 0, 0]],
        ];
        type.upSection.cornerTopSection.dimensions = [
            [[this.sectionUpHeight - constants.constant('materialWidth')], [this.sectionDepth], [quantity], [1, 0, 0, 1]], 
            [[this.sectionUpHeight - constants.constant('materialWidth')], [this.sectionDepth], [quantity], [1, 0, 0, 1]], 
            [[this.sectionWidth], [this.sectionDepth], [quantity], [1, 0, 1, 1]], 
            [[this.sectionWidth - constants.constant('materialWidth') * 2], [this.sectionDepth - constants.constant('indentBackside')], [quantity], [1, 0, 0, 0]],
        ];
        type.upSection.cornerJoinSection.dimensions = [
            [[this.sectionUpHeight], [this.sectionDepth + constants.constant('indentJoinSection')], [quantity], [1, 0, 1, 1]], 
            [[this.sectionUpHeight - constants.constant('materialWidth')], [this.sectionDepth], [quantity], [1, 0, 0, 1]], 
            [[this.sectionWidth - constants.constant('materialWidth')], [this.sectionDepth], [quantity], [1, 0, 0, 1]], 
            [[this.sectionWidth - constants.constant('materialWidth') * 2], [this.sectionDepth - constants.constant('indentBackside')], [quantity], [1, 0, 0, 0]],
        ];
        const details = type[form.tier.value][this.sectionType].dimensions
        return details
    }
    getShelvesDimensions() {
        let washEdge = (form.sink.checked) ? 1 : 0;
        let numberShelves = +form.shelves.value;
        if (form.oven.checked) numberShelves += 1;
        if (form.microwave.checked) numberShelves += 1;
        type.downSection.originalBottomSection.dimensions = [
            [this.sectionWidth - constants.constant('materialWidth')* 2], 
            [this.sectionDepth - constants.constant('indentCountertop') - constants.constant('indentShelve')], 
            [numberShelves], 
            [1, washEdge, washEdge, washEdge]
        ];
        type.downSection.cornerBottomSection.dimensions = [
            [this.sectionWidth - constants.constant('materialWidth') * 2 - constants.constant('indentWall')], 
            [this.sectionDepth - constants.constant('indentCountertop') - constants.constant('indentCornerSection')], 
            [numberShelves], 
            [1, washEdge, washEdge, washEdge]
        ];
        type.downSection.cupboardSection.dimensions = [
            [this.sectionWidth - constants.constant('materialWidth') * 2], 
            [this.sectionDepth - constants.constant('indentCountertop') - constants.constant('indentShelve')], 
            [numberShelves], 
            [1, 0, 0, 0]
        ];
        type.upSection.originalTopSection.dimensions = [
            [this.sectionWidth - constants.constant('materialWidth') * 2], 
            [this.sectionDepth - constants.constant('indentShelve') - constants.constant('indentBackside')], 
            [numberShelves], 
            [1, 0, 0, 0]
        ];
        type.upSection.hoodSection.dimensions = [
            [this.sectionWidth - constants.constant('materialWidth') * 2], 
            [this.sectionDepth - constants.constant('indentShelve') - constants.constant('indentBackside')], 
            [numberShelves], 
            [1, 0, 0, 0]
        ];
        type.upSection.cornerTopSection.dimensions = [
            [this.sectionWidth - constants.constant('materialWidth') * 2], 
            [this.sectionDepth - constants.constant('indentCornerSection') - constants.constant('indentBackside')], 
            [numberShelves], 
            [1, 0, 0, 0]
        ];
        type.upSection.cornerJoinSection.dimensions = [
            [this.sectionWidth - constants.constant('materialWidth') * 2], 
            [this.sectionDepth - constants.constant('indentShelve') - constants.constant('indentBackside')], 
            [numberShelves], 
            [1, 0, 0, 0]
        ];
        const detail = type[form.tier.value][this.sectionType].dimensions
        return detail
    }
    getDrawersDimensions() {
        const heightDetailSide = Math.floor((this.sectionDepth - 13) / 50) * 50;
        let widthDetailSide = (!form.oven.checked) 
            ? Math.round((this.sectionHeight - constants.constant('materialWidth')) / form.drawers.value * 0.65) 
            : constants.constant('ovenDrawer');
        const heightDetailFront = this.sectionWidth - constants.constant('materialWidth') * 4 - 5 * 2;
        const widthDetailFront = widthDetailSide - 13;
        const heightDetailDown = heightDetailSide - constants.constant('materialWidth') * 2;
        const widthDetailDown = heightDetailFront;
        const edgeDrawer = [
            [1, 1, 0, 1], [1, 1, 0, 0], [0, 0, 0, 0]
        ]
        const detailSide = [[heightDetailSide], [widthDetailSide], [form.drawers.value * 2], edgeDrawer[0]];
        const detailFront = [[heightDetailFront], [widthDetailFront], [form.drawers.value * 2], edgeDrawer[1]];
        const detailDown = [[heightDetailDown], [widthDetailDown], [form.drawers.value], edgeDrawer[2]];
        const detail = [detailSide, detailFront, detailDown]
        
        return detail
    }
    getVisibleSideDimensions() {
        let plinth = +form.plinth.value
        const edgeVisibleSide = [2, 1, 1, 1];
        const detail = [[this.sectionHeight + plinth], [this.sectionDepth], [1], edgeVisibleSide]
        return detail
    }
    getFalseDimensions() {
        let detail = [];
        if (this.sectionType === "cornerBottomSection") {
            detail = [[this.sectionHeight], [this.neighboringSectionWidth - constants.constant('indentCountertop') - 10 + 35], [1], [1, 1, 1, 0]];
        } else if (this.sectionType === "cornerTopSection") {
            detail = [[this.sectionUpHeight], [this.neighboringSectionWidth - 5 + 36], [1], [1, 1, 1, 0]];
        }
        return detail
    }
    getFrontDimensions() {
        let divider, numberFront, width;
        let numberHinges = 0;
        if (form.drawers.value > 0) {
            divider = form.drawers.value;
            numberFront = form.drawers.value
            width = this.sectionWidth;
        } else {
            divider = 1;
            if (this.sectionType === "cornerBottomSection") {
                width = (this.sectionWidth - (this.neighboringSectionWidth - constants.constant('indentCountertop') - 10 + 35) - constants.constant('indentWall'));
                if (width > 600) form.front.value = 2;
            } else if (this.sectionType === "cornerTopSection") {
                width = (this.sectionWidth - (this.neighboringSectionWidth - 5 + 36));
                if (width > 600) form.front.value = 2;
            } else {
                width = this.sectionWidth;
                if (width > 600) form.front.value = 2;
            }
            numberFront = form.front.value;
        }
        let edge = (form.frontMaterial.value === "dsp") ? [2, 2, 2, 2] : [0, 0, 0, 0];
        let heightFront = (form.tier.value === "upSection") 
            ? this.sectionUpHeight - constants.constant('indentFront') 
            : (this.sectionHeight / divider) - constants.constant('indentFront') * 2;
        if (heightFront <= 900) {
            numberHinges = 2 * form.front.value;
        } else if (heightFront <= 1400) {
            numberHinges = 3 * form.front.value;
        } else if (heightFront <= 2000) {
            numberHinges = 4 * form.front.value;
        } else if (heightFront <= 2400) {
            numberHinges = 5 * form.front.value;
        }
        if (form.drawers.value > 0) numberHinges = 0

        let widthFront = (width / form.front.value) - constants.constant('indentFront');
        let detail = [[[heightFront], [widthFront], [numberFront], edge]];
        if (this.sectionType === "cupboardSection") {
            let numberUpFront = (this.sectionWidth > 600) ? 2 : 1
            heightFront = this.kitchenHeight - form.plinth.value - this.sectionHeight - constants.constant('indentFront');
            widthFront = (this.sectionWidth / numberUpFront - constants.constant('indentFront'));
            if (form.oven.checked) heightFront -= constants.constant('ovenHeight');
            if (form.microwave.checked) heightFront -= constants.constant('microwaveHeight');
            if (heightFront <= 900) {
                numberHinges += 2 * form.front.value;
            } else if (heightFront <= 1400) {
                numberHinges += 3 * form.front.value;
            } else if (heightFront <= 2000) {
                numberHinges += 4 * form.front.value;
            } else if (heightFront <= 2400) {
                numberHinges += 5 * form.front.value;
            }
            
            let secondFront = [[heightFront], [widthFront], [numberUpFront], edge];
            detail.push(secondFront);
            
        }
        detail.push(numberHinges)
        return detail;
    }
    getPlinthDimensions() {
        let detail = {};
        let cornerIndent = 0;
        if (this.sectionType === 'cornerBottomSection') cornerIndent = this.sectionDepth - constants.constant('indentPlinth');
        let heightPlinth = this.sectionWidth - cornerIndent;
        if (this.sectionType === 'cupboardSection') heightPlinth = 0;
        if (this.leftSection)  {
            detail.rightSection = [[heightPlinth], [+form.plinth.value], [1], [1, 1, 1, 1]];
            detail.leftSection = [[0], [+form.plinth.value], [1], [1, 1, 1, 1]];
        } else {
            detail.leftSection = [[heightPlinth], [+form.plinth.value], [1], [1, 1, 1, 1]];
            detail.rightSection = [[0], [+form.plinth.value], [1], [1, 1, 1, 1]];
        }
        return detail
    }
    getCupboardPlinth() {
        let detail = [[this.sectionWidth - constants.constant('materialWidth') * 2], [+form.plinth.value], [1], [1, 1, 1, 1]]
        return detail
    }
    getTabletopDimension() {
        let detail = {};
        let topEdge = (this.sectionDepth < 600) ? 1 : 0;
        let leftSideEdge = (dataService.allMaterials.leftTabletops.length > 0) ? 0 : 1;
        let rightSideEdge = (dataService.allMaterials.rightTabletops.length > 0) ? 0 : 1;
        let heightTabletop = this.sectionWidth;
        if (this.sectionType === 'cupboardSection') heightTabletop = 0;
        if (this.leftSection)  {
            detail.rightSection = [[heightTabletop], [this.sectionDepth], [1], [topEdge, 0, rightSideEdge, rightSideEdge]];
            detail.leftSection = [[0], [this.sectionDepth], [1], [0, 0, leftSideEdge, leftSideEdge]];
        } else {
            detail.leftSection = [[heightTabletop], [this.sectionDepth], [1], [topEdge, 0, leftSideEdge, leftSideEdge]];
            detail.rightSection = [[0], [this.sectionDepth], [1], [0, 0, rightSideEdge, rightSideEdge]];
        }
        return detail
    }
    createSection() {
        let createSection = new CreateSection(this);
        createSection.createDetailsDimensions();
    }
}
class CreateSection {
    constructor(section) {
        this.section = section
    }
    createDetailsDimensions() {
        let allDetail = new Array;
        let drilling = 0;
        let numberHinges = 0;
        let ledGroove = 0;
        let dvpGroove = 0;
        let millingCut = 0;
        let sectionFronts = this.section.getFrontDimensions();
        numberHinges = sectionFronts.splice(sectionFronts.length - 1, 1)
        drilling += numberHinges * 2
        if (form.visibleSide.checked) {
            let visibleSideDetail = this.section.getVisibleSideDimensions();
            allDetail.push(visibleSideDetail);
        }
        if (!form.dishwasher.checked) {
            let sectionDetails = this.section.getSectionDimensions()
            sectionDetails.forEach((item) => {
                allDetail.push(item);
                drilling += 4;
            })
            if (this.section.sectionType === "originalBottomSection" || this.section.sectionType === "cornerBottomSection") {
                const edgePartition = [1, 1, 0, 0];
                let partitionDetail;
                if (!form.oven.checked) {
                partitionDetail = this.section.getSectionDimensions()[3];
                partitionDetail[partitionDetail.length - 1] = edgePartition;
                allDetail.push(partitionDetail);
                }
            }
            if (form.shelves.value > 0) {
                let shelvesDetail = this.section.getShelvesDimensions();
                allDetail.push(shelvesDetail);
                (this.section.sectionType === "cornerBottomSection" || this.section.sectionType === "cornerBottomSection") 
                ? drilling += form.shelves.value * 5 
                : drilling += form.shelves.value * 4;
            }
            if (form.drawers.value > 0) {
                let drawersDetails = this.section.getDrawersDimensions();
                drawersDetails.forEach((item) => allDetail.push(item));
                drilling += form.drawers.value * 34
            }
            let falseDetail = this.section.getFalseDimensions();
            if (falseDetail.length > 0) {
                allDetail.push(falseDetail);
                (this.section.sectionType === "cornerBottomSection") ? drilling += 10 : drilling += 14 
            }
            let cupboardPlinth = this.section.getCupboardPlinth();
            if (this.section.sectionType === "cupboardSection") allDetail.push(cupboardPlinth);
        }
        if (form.backlight.checked) ledGroove = this.section.sectionWidth / 1000 * 6;
        if (form.tier.value === "upSection") dvpGroove = ((this.section.sectionUpHeight * 2 + this.section.sectionWidth)) / 1000
        let sectionMaterial;
        if (!form.dishwasher.checked) {
            let sectionOptions = this.calculationMaterial(allDetail)
            sectionMaterial = new Material(form.bodyCode.value, sectionOptions[0], sectionOptions[1], 
                sectionOptions[2], sectionOptions[3], form.bodyPrice.value, "ДСП", drilling, ledGroove, dvpGroove, millingCut);
        } else {
            allDetail = [];
            sectionMaterial = new Material(form.bodyCode.value, 0, 0, 0, 0, form.bodyPrice.value, "ДСП", 0, 0, 0, 0);
            numberHinges = 0;
            millingCut = this.section.sectionWidth / 1000 + 0.02
        }
        
        let frontOptions = this.calculationMaterial(sectionFronts);
        let frontMaterial = new Material(form.frontCode.value, frontOptions[0], frontOptions[1], 
            frontOptions[2], frontOptions[3], form.frontPrice.value, 
            form.frontMaterial.options[form.frontMaterial.selectedIndex].text, numberHinges, ledGroove, dvpGroove, millingCut);

        let dvp = new Dvp(this);
        let allDvp = dvp.createDvp();
        let dvpOptions = this.calculationDvp(allDvp);
        let dvpMaterial = new Material(form.dvpCode.value, dvpOptions, 0, 0, 0, form.dvpPrice.value, "ДВП", 0, 0, 0, 0)

        let plinth = this.section.getPlinthDimensions();
        let allPlinth = [];
        allPlinth.push(plinth.leftSection);
        allPlinth.push(plinth.rightSection);
        let plinthOptions = this.calculationMaterial(allPlinth);
        let plinthMaterial = new Material(form.bodyCode.value, plinthOptions[0], plinthOptions[1], 
            plinthOptions[2], plinthOptions[3], form.bodyPrice.value, "ДСП", 0, 0, 0, millingCut);

        let tabletop = this.section.getTabletopDimension();
        let allTabletop = [];
        millingCut = 0;
        if (form.sink.checked) millingCut += 2.5;
        if (form.hob.checked) millingCut += 2.0;
        allTabletop.push(tabletop.leftSection);
        allTabletop.push(tabletop.rightSection);
        let tabletopOptions = this.calculationMaterial(allTabletop);
        let tabletopMaterial = new Material(form.tabletopCode.value, tabletopOptions[0], tabletopOptions[1],
            tabletopOptions[2], tabletopOptions[3], form.tabletopPrice.value, "Стільниця", 0, 0, 0, millingCut)

        dataService.addDetails(allDetail, sectionMaterial);
        dataService.addPlinth(plinth, plinthMaterial);
        dataService.addFronts(sectionFronts, frontMaterial);
        dataService.addDvps(allDvp, dvpMaterial);
        dataService.addTabletops(tabletop, tabletopMaterial);
        sectionListView1.drawAll(dataService.allSections);
        sectionListView2.drawAll(dataService.allFronts);
        sectionListView3.drawAll(dataService.allDvp);
        sectionListView4.drawAll(dataService.allTabletop);
        sectionSpecification1.drawAllMaterial();
        sectionCounter();
    }

    calculationDvp(details) {
        let areaSection = 0;
        details.forEach (item => {
            let detail = new Detail(item[0][0], item[1][0], item[2][0]);
            areaSection += detail.area;
        })
        return areaSection
    }

    calculationMaterial(details) {
        let areaSection = 0;
        let boldEdge = 0;
        let thinEdge = 0;
        let commonEdge = 0;
        details.forEach (item => {
            if (item[0][0] === 0 || item[1][0] === 0) return
            let detail = new Detail(item[0][0], item[1][0], item[2][0], item[3][0], item[3][1], item[3][2], item[3][3]);
            areaSection += detail.area;
            boldEdge += detail.boldEdge();
            thinEdge += detail.thinEdge();
            commonEdge += detail.commonEdge();
        })
        return [areaSection, boldEdge, thinEdge, commonEdge]
    }
}

let detailingInput1 = document.getElementById('detailingInput1');
let detailingInput2 = document.getElementById('detailingInput2');
let detailingInput3 = document.getElementById('detailingInput3');
let detailingInput4 = document.getElementById('detailingInput4');
let specificationInput1 = document.getElementById('specificationInput1');
let sectionListView1 = new SectionsListView(detailingInput1);
let sectionListView2 = new SectionsListView(detailingInput2);
let sectionListView3 = new SectionsListView(detailingInput3);
let sectionListView4 = new SectionsListView(detailingInput4);
let sectionSpecification1 = new SectionsListView(specificationInput1);
dataService.addConstant(constants);
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
priceBtn.addEventListener('click', (event) => {
    event.preventDefault();
    sectionSpecification1.drawAllMaterial();
})