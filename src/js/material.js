export class Material {
    constructor(materialCode, area, boldEdge, thinEdge, commonEdge, price, material, drilling, ledGroove, dvpGroove, millingCut) {
        this.materialCode = materialCode,
        this.area = +area.toFixed(2),
        this.boldEdge = +boldEdge,
        this.thinEdge = +thinEdge,
        this.commonEdge = +commonEdge,
        this.price = +price,
        this.material = material,
        this.drilling = +drilling,
        this.ledGroove = +ledGroove,
        this.dvpGroove = +dvpGroove,
        this.millingCut = +millingCut
    }

    get cutting() {
        let cutting = this.area / 5.3 * 35
        return +cutting;
    }

    get dvpCutting() {
        let cutting = this.area / 5.3 * 30
        return +cutting;
    }
}