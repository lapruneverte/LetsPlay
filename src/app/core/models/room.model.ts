import { TokenModel } from './token.model';
import { PlayerModel } from './player.model';
import { CardModel } from './card.model';
import { StoreCardModel } from './store-card.model';
import { StoreLogModel } from './store-log.model';

export class RoomModel {
    name: string;
    password: string;
    owner: string;
    gameType: string;
    link: string;
    tokens: TokenModel[];
    players?: PlayerModel[];
    store: StoreCardModel[];
    storeLog: StoreLogModel[];
    id: string;

    constructor() {};
}