import { Detail } from "./detail.js";
import { Material, MaterialBody, MaterialFront, MaterialPlinth, MaterialTabletop } from "./material.js";
import { SectionsListView } from "./section_list_view.js";
import { constants } from "./constants.js";
import { Dvp } from "./dvp.js";
import { sectionCounter } from "./sections_counter.js";
import { SectionFurniture } from "./section_furniture.js";
import { dataService } from "./data_service.js";

const form = document.forms.inputForm;
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
        let gola = (form.frontOpening.value === 'gola') ? 27 : 0;
        let golaTop = (form.frontOpening.value === 'longerFacade') ? 10 : 0;
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
            ? this.sectionUpHeight - constants.constant('indentFront') + golaTop 
            : Math.round((this.sectionHeight - constants.constant('indentFront') * (+divider + 1)) / divider) - gola;
        if (this.sectionType === "originalBottomSection" && form.oven.checked) heightFront -= constants.constant('ovenHeight');
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
        if (this.sectionType === 'cornerBottomSection') cornerIndent = this.neighboringSectionWidth - constants.constant('indentPlinth');
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
        let millingCutMin = 0;
        let ledLenght = 0;
        let hooks = 0;
        let rail = 0;
        let confirmats = 0;
        let shelfHolder = 0;
        let legs = 0

        if (form.tier.value === "downSection") {
            legs = (this.section.sectionWidth <= 600) ? 4 : 6;
        }
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
                confirmats += 2;
            })
            if (this.section.sectionType === "originalBottomSection" || this.section.sectionType === "cornerBottomSection") {
                const edgePartition = [1, 1, 0, 0];
                let partitionDetail;
                if (!form.oven.checked) {
                    partitionDetail = this.section.getSectionDimensions()[3];
                if (!form.sink.checked) partitionDetail[partitionDetail.length - 1] = edgePartition;
                    allDetail.push(partitionDetail);
                }
            }
            if (form.shelves.value > 0) {
                let shelvesDetail = this.section.getShelvesDimensions();
                allDetail.push(shelvesDetail);
                (this.section.sectionType === "cornerBottomSection" || this.section.sectionType === "cornerTopSection") 
                    ? shelfHolder += form.shelves.value * 5 
                    : shelfHolder += form.shelves.value * 4;
                drilling += shelfHolder;
            }
            if (form.drawers.value > 0) {
                let drawersDetails = this.section.getDrawersDimensions();
                drawersDetails.forEach((item) => allDetail.push(item));
                drilling += form.drawers.value * 34;
                confirmats += form.drawers.value * 14;
            }
            let falseDetail = this.section.getFalseDimensions();
            if (falseDetail.length > 0) {
                allDetail.push(falseDetail);
                if (this.section.sectionType === "cornerBottomSection") {
                    drilling += 10;
                    confirmats += 5;
                } else {
                    drilling += 14;
                    confirmats += 7; 
                }
            }
            let cupboardPlinth = this.section.getCupboardPlinth();
            if (this.section.sectionType === "cupboardSection") allDetail.push(cupboardPlinth);
        }
        if (form.backlight.checked) {
            ledLenght = this.section.sectionWidth / 1000
            ledGroove = ledLenght * 6;
        }
        if (form.tier.value === "upSection") {
            dvpGroove = ((this.section.sectionUpHeight * 2 + this.section.sectionWidth)) / 1000;
            hooks = 2;
            rail = this.section.sectionWidth / 1000;
        }
        if (form.frontOpening.value === 'gola') {
            millingCutMin = (form.drawers.value > 0) ? form.drawers.value * 2 : 2;
        }
        let sectionMaterial;
        if (!form.dishwasher.checked) {
            let sectionOptions = this.calculationMaterial(allDetail)
            sectionMaterial = new MaterialBody(form.bodyCode.value, sectionOptions[0], form.bodyPrice.value, "ДСП", sectionOptions[1], 
                sectionOptions[2], sectionOptions[3], drilling, ledGroove, dvpGroove, millingCutMin, 0);
        } else {
            allDetail = [];
            millingCut = this.section.sectionWidth / 1000 + 0.02
            sectionMaterial = new MaterialBody(form.bodyCode.value, 0, form.bodyPrice.value, "ДСП", 0, 0, 0, 0, 0, 0, 0, millingCut);
            numberHinges[0] = 0;
            legs = 0;
            millingCutMin = 0;
            
        }
        
        let frontOptions = this.calculationMaterial(sectionFronts);
        let frontMaterial = new MaterialFront(form.frontCode.value, frontOptions[0], form.frontPrice.value, 
            form.frontMaterial.options[form.frontMaterial.selectedIndex].text, frontOptions[1], 
            frontOptions[2], frontOptions[3], numberHinges);

        let dvp = new Dvp(this);
        let allDvp = dvp.createDvp();
        let dvpOptions = this.calculationDvp(allDvp);
        let dvpMaterial = new Material(form.dvpCode.value, dvpOptions, form.dvpPrice.value, "ДВП")

        let plinth = this.section.getPlinthDimensions();
        let allPlinth = [];
        allPlinth.push(plinth.leftSection);
        allPlinth.push(plinth.rightSection);
        let plinthOptions = this.calculationMaterial(allPlinth);
        let plinthMaterial = new MaterialPlinth(form.bodyCode.value, plinthOptions[0], form.bodyPrice.value, "ДСП", plinthOptions[1], 
            plinthOptions[2], plinthOptions[3]);

        let tabletop = this.section.getTabletopDimension();
        let allTabletop = [];
        millingCut = 0;
        if (form.sink.checked) millingCut += 2.5;
        if (form.hob.checked) millingCut += 2.0;
        allTabletop.push(tabletop.leftSection);
        allTabletop.push(tabletop.rightSection);
        let tabletopOptions = this.calculationMaterial(allTabletop);
        let tabletopMaterial = new MaterialTabletop(form.tabletopCode.value, tabletopOptions[0], form.tabletopPrice.value, "Стільниця", tabletopOptions[1],
            tabletopOptions[2], tabletopOptions[3], millingCut)

        let plinthSeal = 0;
        if (form.tier.value === "downSection") plinthSeal = this.section.sectionWidth / 1000;
        if (this.section.sectionType === "cornerBottomSection") plinthSeal -= (this.section.neighboringSectionWidth - constants.constant('indentPlinth')) / 1000;
        let numberDrawers = +form.drawers.value;
        let golaL = (form.frontOpening.value === 'gola') ? this.section.sectionWidth / 1000 : 0;
        let golaC = (form.frontOpening.value === 'gola' && form.drawers.value > 0) ? this.section.sectionWidth * (form.drawers.value - 1) / 1000 : 0;
        let numberFront = (form.drawers.value > 0) ? +form.drawers.value : +form.front.value;
        if (this.section.sectionType === "cupboardSection") numberFront += sectionFronts[1][2][0];
        let kargo = (form.kargo.checked) ? 1 : 0;
        let sink = (form.sink.checked) ? 1 : 0;
        let dish = (form.dish.checked) ? 1 : 0;
        let handle = (form.frontOpening.value === 'handle') ? numberFront : 0;
        let push = (form.frontOpening.value === 'push') ? numberFront - form.drawers.value : 0;
        let furniture = new SectionFurniture(numberHinges[0], numberDrawers, kargo, sink, dish, legs, hooks, rail, 
            ledLenght, plinthSeal, confirmats, shelfHolder, golaL, golaC, handle, push);

        dataService.addDetails(allDetail, sectionMaterial);
        dataService.addPlinth(plinth, plinthMaterial);
        dataService.addFronts(sectionFronts, frontMaterial);
        dataService.addDvps(allDvp, dvpMaterial);
        dataService.addTabletops(tabletop, tabletopMaterial);
        dataService.addUsedFurniture(furniture);
        addUsedFurniture();
        sectionListView1.drawAll(dataService.allSections);
        sectionListView2.drawAll(dataService.allFronts);
        sectionListView3.drawAll(dataService.allDvp);
        if (dataService.allTabletop[0].length > 0 || dataService.allTabletop[1].length > 0) sectionListView4.drawAll(dataService.allTabletop);
        if (dataService.saveMaterials.length > 0) document.querySelector('.specification__material').classList.remove('hide')
        sectionSpecification1.drawAllMaterial(dataService.saveMaterials);
        document.querySelector('.specification__total').classList.remove('hide');
        sectionSpecification1.drawTotalList();
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

export function addUsedFurniture() {
    let targetDiv = document.querySelector('.used__inputs');
    targetDiv.innerHTML = "";
    for (let key in dataService.usedFurniture) {
        if (dataService.usedFurniture[key].value === 0 || dataService.usedFurniture[key].value === 0.00) continue
        let div = document.createElement('div');
        div.classList.add('used__item')
        div.textContent = dataService.usedFurniture[key].description + ' : ' + dataService.usedFurniture[key].value;
        targetDiv.append(div)
    }
}

let detailingInput1 = document.getElementById('detailingInput1');
let detailingInput2 = document.getElementById('detailingInput2');
let detailingInput3 = document.getElementById('detailingInput3');
let detailingInput4 = document.getElementById('detailingInput4');
let specificationInput1 = document.getElementById('specificationInput1');
let specificationInput2 = document.getElementById('specificationInput2');
export let sectionListView1 = new SectionsListView(detailingInput1);
export let sectionListView2 = new SectionsListView(detailingInput2);
export let sectionListView3 = new SectionsListView(detailingInput3);
export let sectionListView4 = new SectionsListView(detailingInput4);
export let sectionSpecification1 = new SectionsListView(specificationInput1);
export let sectionSpecification2 = new SectionsListView(specificationInput2);

dataService.addConstant(constants);
addUsedFurniture();

priceBtn.addEventListener('click', (event) => {
    event.preventDefault();
    sectionSpecification1.drawAllMaterial(dataService.saveMaterials);
})