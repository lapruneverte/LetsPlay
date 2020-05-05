import { TokenModel } from './token.model';
import { PlayerModel } from './player.model';
import { CardModel } from './card.model';
import { StoreModel } from './store.model';

export class RoomModel {
    name: string;
    password: string;
    owner: string;
    gameType: string;
    link: string;
    tokens: TokenModel[];
    players?: PlayerModel[];
    store: StoreModel[];
    id: string;

    constructor() {};
}