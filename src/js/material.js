// import { bodyManufacturerName, frontManufacturerName, tabletopManufacturerName, dvpManufacturerName } from "./create_list.js";
const form = document.forms.setttingsForm1;

export class Material {
    constructor(materialCode, area, price, material) {
        this.materialCode = materialCode;
        this.area = +area.toFixed(2);
        this.price = +price;
        this.material = material;
    }

    get cutting() {
        let cutting = this.area / 5.3 * 35
        return +cutting;
    }

    get dvpCutting() {
        let cutting = this.area / 5.3 * 30
        return +cutting;
    }

    get discount() {
        let discount = dvpManufacturerDiscount[form.frontManufacturer.value];
        return discount;
    }
}
export class MaterialBody extends Material{
    constructor(materialCode, area, price, material, boldEdge, thinEdge, commonEdge, drilling, ledGroove, dvpGroove, millingCutMin, millingCut) {
        super(materialCode, area, price, material);
        this.boldEdge = +boldEdge;
        this.thinEdge = +thinEdge;
        this.commonEdge = +commonEdge;
        this.drilling = +drilling;
        this.ledGroove = +ledGroove;
        this.dvpGroove = +dvpGroove;
        this.millingCutMin = +millingCutMin;
        this.millingCut = +millingCut;
    }

    get discount() {
        let discount = bodyManufacturerDiscount[form.bodyManufacturer.value];
        return discount;
    }
}
export class MaterialFront extends Material{
    constructor(materialCode, area, price, material, boldEdge, thinEdge, commonEdge, drilling) {
        super(materialCode, area, price, material);
        this.boldEdge = +boldEdge;
        this.thinEdge = +thinEdge;
        this.commonEdge = +commonEdge;
        this.drilling = +drilling;
    }

    get discount() {
        let discount = frontManufacturerDiscount[form.frontManufacturer.value];
        return discount;
    }
}
export class MaterialPlinth extends Material{
    constructor(materialCode, area, price, material, boldEdge, thinEdge, commonEdge) {
        super(materialCode, area, price, material);
        this.boldEdge = +boldEdge;
        this.thinEdge = +thinEdge;
        this.commonEdge = +commonEdge;
    }

    get discount() {
        let discount = bodyManufacturerDiscount[form.bodyManufacturer.value];
        return discount;
    }
}
export class MaterialTabletop extends Material{
    constructor(materialCode, area, price, material, boldEdge, thinEdge, commonEdge, millingCut) {
        super(materialCode, area, price, material);
        this.boldEdge = +boldEdge;
        this.thinEdge = +thinEdge;
        this.commonEdge = +commonEdge;
        this.millingCut = +millingCut;
    }

    get discount() {
        let discount = tabletopManufacturerDiscount[form.tabletopManufacturer.value];
        return discount;
    }
}

const bodyManufacturerDiscount = {
    kronospan: 10,
    swisskrono: 'Swiss Krono',
    egger: 9.5,
    cleaf: 'Cleaf',
    saviola: 'Saviola',
}
const frontManufacturerDiscount = {
    kronospan: 10,
    swisskrono: 'Swiss Krono',
    egger: 9.5,
    cleaf: 'Cleaf',
    saviola: 'Saviola',
    plow: 'МДФ плівка',
    paunt: 'МДФ фарба'
}
const tabletopManufacturerDiscount = {
    kronospan: 3,
    swisskrono: 'Swiss Krono',
    egger: 18.5,
    luxeform: 3,
    arpa: 'Arpa',
    fenix: 'FENIX',
    ricci: 'RICCI'
}
const dvpManufacturerDiscount = {
    kronospan: 18,
    pfleiderer: 18,
}