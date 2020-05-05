import { CardModel } from "./card.model";

export class StoreCardModel {
    quantity: number;
    card: CardModel;
    position: {
        x: number,
        y: number
    }

    constructor() {
    };
}