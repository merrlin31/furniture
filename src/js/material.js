export class Material {
    constructor(materialCode, area, boldEdge, thinEdge, commonEdge, price, material, drilling, ledGroove, dvpGroove, millingCut) {
        this.materialCode = materialCode,
        this.area = +area.toFixed(2),
        this.boldEdge = +boldEdge.toFixed(2),
        this.thinEdge = +thinEdge.toFixed(2),
        this.commonEdge = +commonEdge.toFixed(2),
        this.price = price,
        this.material = material,
        this.drilling = +drilling,
        this.ledGroove = +ledGroove.toFixed(2),
        this.dvpGroove = +dvpGroove.toFixed(2),
        this.millingCut = +millingCut.toFixed(2)
    }

    get cutting() {
        let cutting = this.area / 5.3 * 35
        return +cutting.toFixed(2);
    }

    get dvpCutting() {
        let cutting = this.area / 5.3 * 30
        return +cutting.toFixed(2);
    }
}