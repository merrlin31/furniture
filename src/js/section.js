import { Detail } from "./detail.js";
import { Material } from "./material.js";
import { SectionsListView } from "./section_list_view.js";
import { constants } from "./constants.js";
import { Dvp } from "./dvp.js";

const form = document.forms.inputForm;
let projectTitle = document.getElementById('headerInput');

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
    sections: [],
    fronts: [],
    dvps: [],
    materials: [],
    allProject: [],
    drilling: 0,
    numberHinges: 0,
    ledGroove: 0,
    dvpGroove: 0,
    cutting: 0,
    dvpCutting: 0,

    get allSections() {
        return this.sections;
    },

    get allFronts() {
        return this.fronts;
    },

    get allDvp() {
        return this.dvps;
    },

    get allMaterials() {
        return this.materials;
    },
    
    get leftSections() {
        return this.sections.filter(section => section.leftSection === true);
    },

    get rightSections() {
        return this.sections.filter(section => section.leftSection === false);
    },

    add(front, frontMaterial, section, material, dvp, dvpMaterial) {
        if (section.length > 0) this.sections.push(section);
        if (dvp.length > 0) this.dvps.push(dvp);
        this.fronts.push(front);
        this.findDuplicate(material);
        this.drilling += material.drilling;
        this.ledGroove += material.ledGroove;
        this.dvpGroove += material.dvpGroove;
        this.cutting += material.cutting;
        this.findDuplicate(frontMaterial);
        this.numberHinges += frontMaterial.drilling;
        if (frontMaterial.material === "ДСП") this.cutting += frontMaterial.cutting;
        this.findDuplicate(dvpMaterial);
        this.dvpCutting += dvpMaterial.dvpCutting;
        this.save();
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

    save() {
        this.allProject.push(this.sections);
        this.allProject.push(this.fronts);
        this.allProject.push(this.materials);
        this.allProject.push(this.drilling);
        this.allProject.push(this.numberHinges);
        this.allProject.push(this.ledGroove);
        this.allProject.push(this.dvpGroove);
        this.allProject.push(this.cutting);
        this.allProject.push(this.dvps);
        this.allProject.push(this.dvpCutting);
        localStorage.setItem(projectTitle.value, JSON.stringify(this.allProject));
    },

    open() {
        this.allProject = JSON.parse(localStorage.getItem(projectTitle.value)) || [];
        this.sections = this.allProject[0];
        this.fronts = this.allProject[1];
        this.materials = this.allProject[2];
        this.drilling = this.allProject[3];
        this.numberHinges = this.allProject[4];
        this.ledGroove = this.allProject[5];
        this.dvpGroove = this.allProject[6];
        this.cutting = this.allProject[7];
        this.dvps = this.allProject[8];
        this.dvpCutting = this.allProject[9];
        sectionListView1.drawAll(dataService.allSections);
        sectionListView2.drawAll(dataService.allFronts);
        sectionListView3.drawAll(dataService.allDvp);
        sectionSpecification1.drawAllMaterial();
    },

    reset() {
        this.sections = []
        this.fronts = []
        localStorage.removeItem(projectTitle.value);
        detailingInput1.innerHTML = "";
        detailingInput2.innerHTML = "";
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
                if (!form.oven.checked) partitionDetail = this.section.getSectionDimensions()[3];
                partitionDetail[partitionDetail.length - 1] = edgePartition;
                allDetail.push(partitionDetail);
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
        }
        if (form.backlight.checked) ledGroove = this.section.sectionWidth / 1000 * 6;
        if (form.tier.value === "upSection") dvpGroove = ((this.section.sectionUpHeight * 2 + this.section.sectionWidth)) / 1000
        let sectionMaterial;
        if (!form.dishwasher.checked) {
            let sectionOptions = this.calculationMaterial(allDetail)
            sectionMaterial = new Material(form.bodyCode.value, sectionOptions[0], sectionOptions[1], 
                sectionOptions[2], sectionOptions[3], form.bodyPrice.value, "ДСП", drilling, ledGroove, dvpGroove);
        } else {
            allDetail = []
            sectionMaterial = new Material(form.bodyCode.value, 0, 0, 0, 0, form.bodyPrice.value, "ДСП", 0, 0, 0);
            numberHinges = 0;
        }
        
        let frontOptions = this.calculationMaterial(sectionFronts)
        let frontMaterial = new Material(form.frontCode.value, frontOptions[0], frontOptions[1], 
            frontOptions[2], frontOptions[3], form.frontPrice.value, 
            form.frontMaterial.options[form.frontMaterial.selectedIndex].text, numberHinges, ledGroove, dvpGroove);

        let dvp = new Dvp(this);
        let allDvp = dvp.createDvp();
        let dvpOptions = this.calculationDvp(allDvp)
        let dvpMaterial = new Material(form.dvpCode.value, dvpOptions, 0, 0, 0, form.dvpPrice.value, "ДВП", 0, 0, 0)

        dataService.add(sectionFronts, frontMaterial, allDetail, sectionMaterial, allDvp, dvpMaterial)
        sectionListView1.drawAll(dataService.allSections);
        sectionListView2.drawAll(dataService.allFronts);
        sectionListView3.drawAll(dataService.allDvp);
        sectionSpecification1.drawAllMaterial();
        console.log(this.section)
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
let specificationInput1 = document.getElementById('specificationInput1');
let sectionListView1 = new SectionsListView(detailingInput1);
let sectionListView2 = new SectionsListView(detailingInput2);
let sectionListView3 = new SectionsListView(detailingInput3);
let sectionSpecification1 = new SectionsListView(specificationInput1);

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