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
class Constants {
    constructor(indentCountertop, indentShelve, materialWidth, indentWall, indentCornerSection,
    indentCupboard, indentHood, indentJoinSection, partition, indentFront,
    ovenHeight, microwaveHeight, ovenDrawer) {
        this.indentCountertop = indentCountertop;
        this.indentShelve = indentShelve;
        this.materialWidth = materialWidth;
        this.indentWall = indentWall;
        this.indentCornerSection = indentCornerSection;
        this.indentCupboard = indentCupboard;
        this.indentHood = indentHood;
        this.indentJoinSection = indentJoinSection;
        this.partition = partition;
        this.indentFront = indentFront;
        this.ovenHeight = ovenHeight;
        this.microwaveHeight = microwaveHeight;
        this.ovenDrawer = ovenDrawer;
    }

    constant(value) {
        return this[value]
    }
}
const constanceValue = [60, 20, 18, 50, 2, 20, 100, 20, 70, 3, 600, 362, 83];
let constans = new Constants(...constanceValue)

let dataService = {
    sections: [],
    fronts: [],
    allProject: [],

    get allSections() {
        return this.sections;
    },

    get allFronts() {
        return this.fronts;
    },
    
    get leftSections() {
        return this.sections.filter(section => section.leftSection === true);
    },

    get rightSections() {
        return this.sections.filter(section => section.leftSection === false);
    },

    add(section, front) {
        this.sections.push(section);
        this.fronts.push(front);
        this.save();
    },

    save() {
        this.allProject.push(this.sections);
        this.allProject.push(this.fronts);
        localStorage.setItem(projectTitle.value, JSON.stringify(this.allProject));
    },

    open() {
        this.allProject = JSON.parse(localStorage.getItem(projectTitle.value)) || [];
        this.sections = this.allProject[0];
        this.fronts = this.allProject[1];
        sectionListView1.drawAllDetails();
        sectionListView2.drawAllFronts();
    },

    reset() {
        this.sections = []
        this.fronts = []
        localStorage.removeItem(projectTitle.value);
        detailingInput1.innerHTML = "";
        detailingInput2.innerHTML = "";
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
        this.leftSection = false;
    }
    getSectionDimensions() {

        let washEdge = (form.sink.checked) ? 1 : 0;
        let oven = form.oven.checked ? this.sectionDepth - constans.constant('indentCountertop') : constans.constant('partition');
        let quantity = 1;
        
        type.downSection.originalBottomSection.dimensions = [
            [[this.sectionHeight - constans.constant('materialWidth')], [this.sectionDepth - constans.constant('indentCountertop')], [quantity], [1, washEdge, 0, 0]], 
            [[this.sectionHeight - constans.constant('materialWidth')], [this.sectionDepth - constans.constant('indentCountertop')], [quantity], [1, washEdge, 0, 0]], 
            [[this.sectionWidth], [this.sectionDepth - constans.constant('indentCountertop')], [quantity], [1, washEdge, 1, 1]], 
            [[this.sectionWidth - constans.constant('materialWidth') * 2], [oven], [quantity], [1, 0, 0, 0]],
        ];
        type.downSection.cornerBottomSection.dimensions = [
            [[this.sectionHeight - constans.constant('materialWidth')], [this.sectionDepth - constans.constant('indentCountertop')], [quantity], [1, washEdge, 0, 0]], 
            [[this.sectionHeight - constans.constant('materialWidth')], [this.sectionDepth - constans.constant('indentCountertop')], [quantity], [1, washEdge, 0, 0]], 
            [[this.sectionWidth - constans.constant('indentWall')], [this.sectionDepth - constans.constant('indentCountertop')], [quantity], [1, washEdge, 1, 1]], 
            [[this.sectionWidth - constans.constant('materialWidth') * 2 - constans.constant('indentWall')], [70], [quantity], [1, 0, 0, 0]],
        ];
        type.downSection.cupboardSection.dimensions = [
            [[this.kitchenHeight], [this.sectionDepth - constans.constant('indentCupboard')], [quantity], [1, 1, 1, 1]], 
            [[this.kitchenHeight], [this.sectionDepth - constans.constant('indentCupboard')], [quantity], [1, 1, 1, 1]], 
            [[this.sectionWidth - constans.constant('materialWidth') * 2], [this.sectionDepth - constans.constant('indentCountertop')], [quantity], [1, 0, 0, 0]], 
            [[this.sectionWidth - constans.constant('materialWidth') * 2], [this.sectionDepth - constans.constant('indentCountertop')], [quantity], [1, 0, 0, 0]],
        ];
        type.upSection.originalTopSection.dimensions = [
            [[this.sectionUpHeight - constans.constant('materialWidth')], [this.sectionDepth], [quantity], [1, 0, 0, 1]], 
            [[this.sectionUpHeight - constans.constant('materialWidth')], [this.sectionDepth], [quantity], [1, 0, 0, 1]], 
            [[this.sectionWidth], [this.sectionDepth], [1, 0, 1, 1]], 
            [[this.sectionWidth - constans.constant('materialWidth') * 2], [this.sectionDepth], [quantity], [1, 0, 0, 0]],
        ];
        type.upSection.hoodSection.dimensions = [
            [[this.sectionUpHeight - constans.constant('indentHood')], [this.sectionDepth], [quantity], [1, 0, 1, 1]], 
            [[this.sectionUpHeight - constans.constant('indentHood')], [this.sectionDepth], [quantity], [1, 0, 1, 1]], 
            [[this.sectionWidth - constans.constant('materialWidth') * 2], [this.sectionDepth], [quantity], [1, 0, 0, 0]], 
            [[this.sectionWidth - constans.constant('materialWidth') * 2], [this.sectionDepth], [quantity], [1, 0, 0, 0]],
        ];
        type.upSection.cornerTopSection.dimensions = [
            [[this.sectionUpHeight - constans.constant('materialWidth')], [this.sectionDepth], [quantity], [1, 0, 0, 1]], 
            [[this.sectionUpHeight - constans.constant('materialWidth')], [this.sectionDepth], [quantity], [1, 0, 0, 1]], 
            [[this.sectionWidth], [this.sectionDepth], [1, 0, 1, 1]], 
            [[this.sectionWidth - constans.constant('materialWidth') * 2], [this.sectionDepth], [quantity], [1, 0, 0, 0]],
        ];
        type.upSection.cornerJoinSection.dimensions = [
            [[this.sectionUpHeight], [this.sectionDepth + constans.constant('indentJoinSection')], [quantity], [1, 0, 1, 1]], 
            [[this.sectionUpHeight - constans.constant('materialWidth')], [this.sectionDepth], [quantity], [1, 0, 0, 1]], 
            [[this.sectionWidth - constans.constant('materialWidth')], [this.sectionDepth], [quantity], [1, 0, 0, 1]], 
            [[this.sectionWidth - constans.constant('materialWidth') * 2], [this.sectionDepth], [quantity], [1, 0, 0, 0]],
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
            [this.sectionWidth - constans.constant('materialWidth')* 2], 
            [this.sectionDepth - constans.constant('indentCountertop') - constans.constant('indentShelve')], 
            [numberShelves], 
            [1, washEdge, washEdge, washEdge]
        ];
        type.downSection.cornerBottomSection.dimensions = [
            [this.sectionWidth - constans.constant('materialWidth') * 2 - constans.constant('indentWall')], 
            [this.sectionDepth - constans.constant('indentCountertop') - constans.constant('indentCornerSection')], 
            [numberShelves], 
            [1, washEdge, washEdge, washEdge]
        ];
        type.downSection.cupboardSection.dimensions = [
            [this.sectionWidth - constans.constant('materialWidth') * 2], 
            [this.sectionDepth - constans.constant('indentCountertop') - constans.constant('indentShelve')], 
            [numberShelves], 
            [1, 0, 0, 0]
        ];
        type.upSection.originalTopSection.dimensions = [
            [this.sectionWidth - constans.constant('materialWidth') * 2], 
            [this.sectionDepth - constans.constant('indentShelve')], 
            [numberShelves], 
            [1, 0, 0, 0]
        ];
        type.upSection.hoodSection.dimensions = [
            [this.sectionWidth - constans.constant('materialWidth') * 2], 
            [this.sectionDepth - constans.constant('indentShelve')], 
            [numberShelves], 
            [1, 0, 0, 0]
        ];
        type.upSection.cornerTopSection.dimensions = [
            [this.sectionWidth - constans.constant('materialWidth') * 2], 
            [this.sectionDepth - constans.constant('indentCornerSection')], 
            [numberShelves], 
            [1, 0, 0, 0]
        ];
        type.upSection.cornerJoinSection.dimensions = [
            [this.sectionWidth - constans.constant('materialWidth') * 2], 
            [this.sectionDepth - constans.constant('indentShelve')], 
            [numberShelves], 
            [1, 0, 0, 0]
        ];
        const detail = type[form.tier.value][this.sectionType].dimensions
        return detail
    }
    getDrawersDimensions() {
        const heightDetailSide = Math.floor((this.sectionDepth - 13) / 50) * 50;
        let widthDetailSide = (!form.oven.checked) 
            ? Math.round((this.sectionHeight - constans.constant('materialWidth')) / form.drawers.value * 0.65) 
            : constans.constant('ovenDrawer');
        const heightDetailFront = this.sectionWidth - constans.constant('materialWidth') * 4 - 5 * 2;
        const widthDetailFront = widthDetailSide - 13;
        const heightDetailDown = heightDetailSide - constans.constant('materialWidth') * 2;
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
            detail = [[this.sectionHeight], [this.neighboringSectionWidth - constans.constant('indentCountertop') - 10 + 35], [1], [1, 1, 1, 0]];
        } else if (this.sectionType === "cornerTopSection") {
            detail = [[this.sectionUpHeight], [this.neighboringSectionWidth - 5 + 36], [1], [1, 1, 1, 0]];
        }
        return detail
    }
    getFrontDimensions() {
        let divider, numberFront;
        if (form.drawers.value > 0) {
            divider = form.drawers.value;
            numberFront = form.drawers.value
        } else {
            divider = 1;
            numberFront = form.front.value;
        }
        let edge = (form.frontMaterial.value === "dsp") ? [2, 2, 2, 2] : [0, 0, 0, 0];
        let heightFront = (form.tier.value === "upSection") 
            ? this.sectionUpHeight - constans.constant('indentFront') 
            : (this.sectionHeight / divider) - constans.constant('indentFront') * 2;
        let widthFront = (this.sectionWidth / form.front.value) - constans.constant('indentFront');
        let detail = [[[heightFront], [widthFront], [numberFront], edge]];
        if (this.sectionType === "cupboardSection") {
            heightFront = this.kitchenHeight - form.plinth.value - this.sectionHeight - constans.constant('indentFront');
            widthFront = (this.sectionWidth - constans.constant('indentFront'));
            if (form.oven.checked) heightFront -= constans.constant('ovenHeight');
            if (form.microwave.checked) heightFront -= constans.constant('microwaveHeight');
            
            let secondFront = [[heightFront], [widthFront], [1], edge];
            detail.push(secondFront);
            
        }
        return detail;
    }
    createSection() {
        let createSection = new CreateSection(this);
        createSection.createDetailsDimensions()
    }
}


class SectionsListView {
    constructor(element) {
        this.element = element;
    }
    drawList(allDetails) {
        this.element.innerHTML = "";
        allDetails.forEach(section => {
            section.createIn(this.element);
        });
    }

    drawAllDetails() {
        let allSections = [];
        let sections = dataService.allSections;
        if (sections.length === 0) return;
        sections.forEach(section => {
            allSections.push(new SectionView(section))
        });
        this.drawList(allSections);
    }
    drawAllFronts() {
        let allFronts = [];
        let fronts = dataService.allFronts;
        if (fronts.length === 0) return;
        fronts.forEach(front => {
            allFronts.push(new SectionView(front))
        });
        this.drawList(allFronts);
    }
}

class SectionView {
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
        element.lastElementChild.classList.add('detailing__section-end')
    }
    changeSide(element) {
        this.section.leftSection = !this.section.leftSection;
        dataService.save();
        this.tbody.classList.toggle("leftSection")
    }
}

class CreateSection {
    constructor(section) {
        this.section = section
    }
    createDetailsDimensions() {
        let allDetail = new Array;
        let sectionFronts = this.section.getFrontDimensions();
        if (form.visibleSide.checked) {
            let visibleSideDetail = this.section.getVisibleSideDimensions();
            allDetail.push(visibleSideDetail);
        }
        if (form.dishwasher.checked) return
        let sectionDetails = this.section.getSectionDimensions()
        sectionDetails.forEach((item) => allDetail.push(item))
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
        }
        if (form.drawers.value > 0) {
            let drawersDetails = this.section.getDrawersDimensions();
            drawersDetails.forEach((item) => allDetail.push(item));
        }
        let falseDetail = this.section.getFalseDimensions();
        if (falseDetail.length > 0) allDetail.push(falseDetail);

        dataService.add(allDetail, sectionFronts)
        sectionListView1.drawAllDetails();
        sectionListView2.drawAllFronts();
    }

}

let detailingInput1 = document.getElementById('detailingInput1');
let detailingInput2 = document.getElementById('detailingInput2');
let sectionListView1 = new SectionsListView(detailingInput1);
let sectionListView2 = new SectionsListView(detailingInput2);
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

