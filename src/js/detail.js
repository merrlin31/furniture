export class Detail {
    constructor(height, width, quantity, topEdge, bottomEdge, leftEdge, rightEdge) {
        this.height = height / 1000;
        this.width = width / 1000;
        this.quantity = quantity;
        this.topEdge = topEdge;
        this.bottomEdge = bottomEdge;
        this.leftEdge = leftEdge;
        this.rightEdge = rightEdge;
    }

    get area() {
        return this.height * this.width * this.quantity
    }

    get heightEdge() {
        return this.height + 0.15
    }

    get widthEdge() {
        return this.width + 0.15
    }

    boldEdge() {
        let boldEdge = 0;
        if (this.topEdge === 2) boldEdge += this.heightEdge;
        if (this.bottomEdge === 2) boldEdge += this.heightEdge;
        if (this.leftEdge === 2) boldEdge += this.widthEdge;
        if (this.rightEdge === 2) boldEdge += this.widthEdge;
        return boldEdge
    }
    thinEdge() {
        let thinEdge = 0;
        if (this.topEdge === 1) thinEdge += this.heightEdge;
        if (this.bottomEdge === 1) thinEdge += this.heightEdge;
        if (this.leftEdge === 1) thinEdge += this.widthEdge;
        if (this.rightEdge === 1) thinEdge += this.widthEdge;
        return thinEdge
    }
    commonEdge() {
        let commonEdge = 0;
        if (this.topEdge !== 0) commonEdge += this.height;
        if (this.bottomEdge !== 0) commonEdge += this.height;
        if (this.leftEdge !== 0) commonEdge += this.width;
        if (this.rightEdge !== 0) commonEdge += this.width;
        return commonEdge
    }
}