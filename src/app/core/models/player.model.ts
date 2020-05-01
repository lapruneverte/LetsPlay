import { CardModel } from './card.model';

export class PlayerModel {
    playerId: number;
    name: string;
    deck: CardModel[];
    inHand: CardModel[];
    played: CardModel[];

    constructor() {};
}