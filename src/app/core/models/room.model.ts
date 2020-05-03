import { TokenModel } from './token.model';
import { PlayerModel } from './player.model';

export class RoomModel {
    name: string;
    password: string;
    owner: string;
    gameType: string;
    link: string;
    tokens: TokenModel[];
    players?: PlayerModel[];
    id: string;

    constructor() {};
}