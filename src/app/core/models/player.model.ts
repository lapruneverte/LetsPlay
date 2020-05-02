import { CardModel } from './card.model';

export class PlayerModel {
    playerId: string;
    name: string;
    deck: CardModel[];
    inHand: CardModel[];
    played: CardModel[];

    constructor(name: string) {
        this.name = name;
        this.deck = [];
        this.inHand = [];
        this.played = [];
    };
}