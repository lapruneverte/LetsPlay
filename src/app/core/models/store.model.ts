import { CardModel } from "./card.model";

export class StoreModel {
    quantity: number;
    card: CardModel;

    constructor(cards: CardModel) {
    };
}