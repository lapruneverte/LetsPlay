import { CardModel } from './card.model';

export class PlayerModel {
    playerId: string;
    name: string;
    deck: CardModel[];
    inHand: CardModel[];
    played: CardModel[];
    preview: CardModel[];
    cardBackside: CardModel;
    blockades: number;
    password: string;

    constructor(name: string, password: string) {
        this.name = name;
        this.deck = [];
        this.inHand = [];
        this.played = [];
        this.preview = [];
        this.blockades = 0;
        this.password = password;
    };
}