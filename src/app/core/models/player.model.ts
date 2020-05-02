import { CardModel } from './card.model';

export class PlayerModel {
    playerId: number;
    name: string;
    deck: CardModel[];
    inHand: CardModel[];
    played: CardModel[];

    constructor(name: string) {
        this.playerId = 1;
        this.name = name;
        this.deck = [];
        this.inHand = [];
        this.played = [];
    };
}