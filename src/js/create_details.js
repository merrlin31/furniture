const indentCountertop = 60;
const indentShelve = 20;
const materialWidth = 18;
const indentWall = 50;
const indentCornerSection = 2;
const indentCupboard = 20;
const indentHood = 100;
const indentJoinSection = 20;
const partition = 70;
const indentFront = 3;
const ovenHeight = 600;
const microwaveHeight = 362

const form = document.forms.inputForm;

let countertopThickness, plinth, kitchenHeight, sectionHeight, sectionUpHeight, sectionWidth, sectionDepth, neighboringSectionWidth;


// export const typeSection = {
//     downSection: {
//         name: 'Нижня шафа',
//         originalBottomSection: {
//             name: 'Звичайна шафа',
//             dimensions: [
//                 [[sectionHeight - materialWidth], [sectionDepth - indentCountertop], [1, 0, 0, 0]], 
//                 [[sectionHeight - materialWidth], [sectionDepth - indentCountertop], [1, 0, 0, 0]], 
//                 [[sectionWidth], [sectionDepth - indentCountertop], [1, 0, 1, 1]], 
//                 [[sectionWidth - materialWidth * 2], [70], [1, 0, 0, 0]],
//                 [[sectionWidth - materialWidth * 2], [sectionDepth - indentCountertop - indentShelve], [1, 0, 0, 0]],
//             ],
//         },
//         cornerBottomSection: {
//             name: 'Кутова шафа',
//             dimensions: [
//                 [[sectionHeight - materialWidth], [sectionDepth - indentCountertop], [1, 0, 0, 0]], 
//                 [[sectionHeight - materialWidth], [sectionDepth - indentCountertop], [1, 0, 0, 0]], 
//                 [[sectionWidth - indentWall], [sectionDepth - indentCountertop], [1, 0, 1, 1]], 
//                 [[sectionWidth - materialWidth * 2 - indentWall], [70], [1, 0, 0, 0]],
//                 [[sectionWidth - materialWidth * 2 - indentWall], [sectionDepth - indentCountertop - indentCornerSection], [1, 0, 0, 0]],
//             ],
//         },
//         cupboardSection: {
//             name: 'Велика шафа',
//             dimensions: [
//                 [[kitchenHeight], [sectionDepth - indentCupboard], [1, 1, 1, 1]], 
//                 [[kitchenHeight], [sectionDepth - indentCupboard], [1, 1, 1, 1]], 
//                 [[sectionWidth - materialWidth * 2], [sectionDepth - indentCountertop], [1, 0, 0, 0]], 
//                 [[sectionWidth - materialWidth * 2], [sectionDepth - indentCountertop], [1, 0, 0, 0]],
//                 [[sectionWidth - materialWidth * 2], [sectionDepth - indentCountertop - indentShelve], [1, 0, 0, 0]],
//             ],
//         },
//     },
//     upSection: {
//         name: 'Верхня шафа',
//         originalTopSection: {
//             name: 'Звичайна шафа',
//             dimensions: [
//                 [[sectionUpHeight - materialWidth], [sectionDepth], [1, 0, 0, 1]], 
//                 [[sectionUpHeight - materialWidth], [sectionDepth], [1, 0, 0, 1]], 
//                 [[sectionWidth], [sectionDepth], [1, 0, 1, 1]], 
//                 [[sectionWidth - materialWidth * 2], [sectionDepth], [1, 0, 0, 0]],
//                 [[sectionWidth - materialWidth * 2], [sectionDepth - indentShelve], [1, 0, 0, 0]],
//             ],
//         },
//         hoodSection: {
//             name: 'Шафа з витяжкою',
//             dimensions: [
//                 [[sectionUpHeight - indentHood], [sectionDepth], [1, 0, 1, 1]], 
//                 [[sectionUpHeight - indentHood], [sectionDepth], [1, 0, 1, 1]], 
//                 [[sectionWidth - materialWidth * 2], [sectionDepth], [1, 0, 0, 0]], 
//                 [[sectionWidth - materialWidth * 2], [sectionDepth], [1, 0, 0, 0]],
//                 [[sectionWidth - materialWidth * 2], [sectionDepth - indentShelve], [1, 0, 0, 0]],
//             ],
//         },
//         cornerTopSection: {
//             name: 'Кутова шафа',
//             dimensions: [
//                 [[sectionUpHeight - materialWidth], [sectionDepth], [1, 0, 0, 1]], 
//                 [[sectionUpHeight - materialWidth], [sectionDepth], [1, 0, 0, 1]], 
//                 [[sectionWidth], [sectionDepth], [1, 0, 1, 1]], 
//                 [[sectionWidth - materialWidth * 2], [sectionDepth], [1, 0, 0, 0]],
//                 [[sectionWidth - materialWidth * 2], [sectionDepth - indentCornerSection], [1, 0, 0, 0]],
//             ],
//         },
//         cornerJoinSection: {
//             name: 'Кутова шафа з фальш-панелю',
//             dimensions: [
//                 [[sectionUpHeight], [sectionDepth + indentJoinSection], [1, 0, 1, 1]], 
//                 [[sectionUpHeight - materialWidth], [sectionDepth], [1, 0, 0, 1]], 
//                 [[sectionWidth - materialWidth], [sectionDepth], [1, 0, 0, 1]], 
//                 [[sectionWidth - materialWidth * 2], [sectionDepth], [1, 0, 0, 0]],
//                 [[sectionWidth - materialWidth * 2], [sectionDepth - indentShelve], [1, 0, 0, 0]],
//             ],
//         },
//     },
// }
export const typeSection = function() {
    let washEdge;
    form.sink.checked ? washEdge = 1 : washEdge = 0;
    let oven;
    form.oven.checked ? oven = sectionDepth - indentCountertop : oven = partition; 
    const type = {
        downSection: {
            name: 'Нижня шафа',
            originalBottomSection: {
                name: 'Звичайна шафа',
                dimensions: [
                    [[sectionHeight - materialWidth], [sectionDepth - indentCountertop], [1, washEdge, 0, 0]], 
                    [[sectionHeight - materialWidth], [sectionDepth - indentCountertop], [1, washEdge, 0, 0]], 
                    [[sectionWidth], [sectionDepth - indentCountertop], [1, washEdge, 1, 1]], 
                    [[sectionWidth - materialWidth * 2], [oven], [1, 0, 0, 0]],
                    [[sectionWidth - materialWidth * 2], [sectionDepth - indentCountertop - indentShelve], [1, washEdge, washEdge, washEdge]],
                ],
            },
            cornerBottomSection: {
                name: 'Кутова шафа',
                dimensions: [
                    [[sectionHeight - materialWidth], [sectionDepth - indentCountertop], [1, washEdge, 0, 0]], 
                    [[sectionHeight - materialWidth], [sectionDepth - indentCountertop], [1, washEdge, 0, 0]], 
                    [[sectionWidth - indentWall], [sectionDepth - indentCountertop], [1, washEdge, 1, 1]], 
                    [[sectionWidth - materialWidth * 2 - indentWall], [70], [1, 0, 0, 0]],
                    [[sectionWidth - materialWidth * 2 - indentWall], [sectionDepth - indentCountertop - indentCornerSection], [1, washEdge, washEdge, washEdge]],
                ],
            },
            cupboardSection: {
                name: 'Велика шафа',
                dimensions: [
                    [[kitchenHeight], [sectionDepth - indentCupboard], [1, 1, 1, 1]], 
                    [[kitchenHeight], [sectionDepth - indentCupboard], [1, 1, 1, 1]], 
                    [[sectionWidth - materialWidth * 2], [sectionDepth - indentCountertop], [1, 0, 0, 0]], 
                    [[sectionWidth - materialWidth * 2], [sectionDepth - indentCountertop], [1, 0, 0, 0]],
                    [[sectionWidth - materialWidth * 2], [sectionDepth - indentCountertop - indentShelve], [1, 0, 0, 0]],
                ],
            },
        },
        upSection: {
            name: 'Верхня шафа',
            originalTopSection: {
                name: 'Звичайна шафа',
                dimensions: [
                    [[sectionUpHeight - materialWidth], [sectionDepth], [1, 0, 0, 1]], 
                    [[sectionUpHeight - materialWidth], [sectionDepth], [1, 0, 0, 1]], 
                    [[sectionWidth], [sectionDepth], [1, 0, 1, 1]], 
                    [[sectionWidth - materialWidth * 2], [sectionDepth], [1, 0, 0, 0]],
                    [[sectionWidth - materialWidth * 2], [sectionDepth - indentShelve], [1, 0, 0, 0]],
                ],
            },
            hoodSection: {
                name: 'Шафа з витяжкою',
                dimensions: [
                    [[sectionUpHeight - indentHood], [sectionDepth], [1, 0, 1, 1]], 
                    [[sectionUpHeight - indentHood], [sectionDepth], [1, 0, 1, 1]], 
                    [[sectionWidth - materialWidth * 2], [sectionDepth], [1, 0, 0, 0]], 
                    [[sectionWidth - materialWidth * 2], [sectionDepth], [1, 0, 0, 0]],
                    [[sectionWidth - materialWidth * 2], [sectionDepth - indentShelve], [1, 0, 0, 0]],
                ],
            },
            cornerTopSection: {
                name: 'Кутова шафа',
                dimensions: [
                    [[sectionUpHeight - materialWidth], [sectionDepth], [1, 0, 0, 1]], 
                    [[sectionUpHeight - materialWidth], [sectionDepth], [1, 0, 0, 1]], 
                    [[sectionWidth], [sectionDepth], [1, 0, 1, 1]], 
                    [[sectionWidth - materialWidth * 2], [sectionDepth], [1, 0, 0, 0]],
                    [[sectionWidth - materialWidth * 2], [sectionDepth - indentCornerSection], [1, 0, 0, 0]],
                ],
            },
            cornerJoinSection: {
                name: 'Кутова шафа з фальш-панелю',
                dimensions: [
                    [[sectionUpHeight], [sectionDepth + indentJoinSection], [1, 0, 1, 1]], 
                    [[sectionUpHeight - materialWidth], [sectionDepth], [1, 0, 0, 1]], 
                    [[sectionWidth - materialWidth], [sectionDepth], [1, 0, 0, 1]], 
                    [[sectionWidth - materialWidth * 2], [sectionDepth], [1, 0, 0, 0]],
                    [[sectionWidth - materialWidth * 2], [sectionDepth - indentShelve], [1, 0, 0, 0]],
                ],
            },
        },
    }
    return type
}

const edgeDrawer = [
    [1, 1, 0, 1], [1, 1, 0, 0], [0, 0, 0, 0]
]
const edgeFront = [[2, 2, 2, 2], [0, 0, 0, 0]];

const edgeVisibleSide = [2, 1, 1, 1];
const falsePanel = function() { 
    const dimensions = [
        [[sectionHeight], [neighboringSectionWidth - indentCountertop - 10 + 35], [1, 1, 1, 0]],
        [[sectionUpHeight], [neighboringSectionWidth - 5 + 36], [1, 1, 1, 0]],
    ]
    return dimensions;
}

function createDetail(heightDetail, widthDetail, edgeDetail, quantity = 1, inputClass = 'detailingInput1') {
    const detail = [heightDetail, widthDetail, quantity];
    const input = document.getElementById(inputClass)
    const tr = document.createElement('tr');
    addDetail(detail, tr)
    addBorder(edgeDetail, tr);
    input.append(tr)
}
function createFront(heightDetail, widthDetail, edgeDetail, kitchenHeight, sectionType) {
    let divider, numberFront, edge;
    if (form.drawers.value > 0) {
        divider = form.drawers.value;
        numberFront = form.drawers.value
    } else {
        divider = 1;
        numberFront = form.front.value;
    } 
    form.frontMaterial.value === "dsp" ? edge = edgeDetail[0] : edge = edgeDetail[1];

    let heightFront = (heightDetail / divider) - indentFront ;
    let widthFront = (widthDetail / form.front.value) - indentFront;
    
    createDetail(heightFront, widthFront, edge, numberFront, 'detailingInput2');
    if (sectionType === "cupboardSection") {
        heightFront = kitchenHeight - form.plinth.value - heightDetail - indentFront;
        widthFront = (widthDetail - indentFront);
        form.oven.checked ? heightFront -= ovenHeight : heightFront;
        form.microwave.checked ? heightFront -= microwaveHeight : heightFront;
        
        createDetail(heightFront, widthFront, edgeDetail, 1, 'detailingInput2')
    }

}
function createDrawer(sectionHeight, sectionWidth, sectionDepth, edgeDetail, quantity = 1) {
    const heightDetailSide = Math.floor((sectionDepth - 13) / 50) * 50;
    const widthDetailSide = Math.round((sectionHeight - materialWidth) / form.drawers.value * 0.65);
    const heightDetailFront = sectionWidth - materialWidth * 4 - 5 * 2;
    const widthDetailFront = widthDetailSide - 13;
    const heightDetailDown = heightDetailSide - materialWidth * 2;
    const widthDetailDown = heightDetailFront;
    const detailSide = [heightDetailSide, widthDetailSide, quantity * 2];
    const detailFront = [heightDetailFront, widthDetailFront, quantity * 2];
    const detailDown = [heightDetailDown, widthDetailDown, quantity];
    const detail = [detailSide, detailFront, detailDown]
    const input = document.getElementById('detailingInput1')
    for (let i = 0; i < detail.length; i++) {
        const tr = document.createElement('tr');
        addDetail(detail[i], tr)
        addBorder(edgeDetail[i], tr);
        input.append(tr)
    }
}

function addDetail(detail, tr) {
    
    for (let item of detail) {
        let td = document.createElement('td');
        td.textContent = item;
        tr.append(td);
    }
}
function addBorder(edges, tr) {
    for (let edge of edges) {
        let td = document.createElement('td');
        td.textContent = edge;
        tr.append(td);
    }  
}

export function createSection(tier, sectionType) {
    countertopThickness = form.countertopThickness;
    plinth = form.plinth;

    kitchenHeight = +heightKitchen.value;
    sectionHeight = heightDownSection.value - countertopThickness.value - plinth.value;
    sectionUpHeight = (heightKitchen.value - heightDownSection.value - 600);

    sectionWidth = +form.sectionWidth.value;
    sectionDepth = +depth.value;

    neighboringSectionWidth = form.neighboringWidth.value

    const details = typeSection()[tier][sectionType].dimensions
    const numberShelves = form.shelves.value;
    const numberDrawers = form.drawers.value;
    if (true) {
        createFront(sectionHeight, sectionWidth, edgeFront, kitchenHeight, sectionType)
        return
    }
    for (let i = 0; i < 4; i++) {
        createDetail (details[i][0], details[i][1], details[i][2])
    }
    if (numberShelves > 0) {
        createDetail (details[4][0], details[4][1], details[4][2], numberShelves)
    }
    if (numberDrawers > 0) {
        createDrawer (sectionHeight, sectionWidth, sectionDepth, edgeDrawer, numberDrawers)
    }
    if (sectionType === "cornerBottomSection") {
        createDetail (falsePanel()[0][0], falsePanel()[0][1], falsePanel()[0][2])
    } else if (sectionType === "cornerTopSection") {
        createDetail (falsePanel()[1][0], falsePanel()[1][1], falsePanel()[1][2])
    }
    if (form.visibleSide.checked) {
        createDetail (sectionHeight - countertopThickness.value, sectionDepth, edgeVisibleSide)
    }
    createFront(sectionHeight, sectionWidth, edgeFront, kitchenHeight, sectionType)
}