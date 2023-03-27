export class SectionFurniture {
    constructor(numberHinges, numberDrawers, kargo, sink, dish, legs, hooks, rail, ledLenght, plinthSeal, confirmats, shelfHolder, golaL, golaC, handle, push) {
        this.numberHinges = numberHinges;
        this.numberDrawers = numberDrawers;
        this.kargo = kargo;
        this.sink = sink;
        this.dish = dish;
        this.legs = legs;
        this.hooks = hooks;
        this.rail = rail;
        this.ledLenght = ledLenght;
        this.plinthSeal = plinthSeal;
        this.confirmats = confirmats;
        this.shelfHolder = shelfHolder;
        this.golaL = golaL;
        this.golaC = golaC;
        this.handle = handle;
        this.push = push;
    }

    get selfTapping15() {
        return this.numberHinges * 5 + this.numberDrawers * 6 + this.kargo * 6 + this.legs * 4 + this.push * 2;
    }

    get selfTapping30() {
        return this.numberDrawers * 4 + this.hooks * 2 + 6;
    }

    get screw40() {
        return this.handle * 2
    }
}