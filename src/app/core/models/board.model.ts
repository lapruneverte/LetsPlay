import { TokenModel } from './token.model';
import { PlayerModel } from './player.model';

export class BoardModel {
    name: string;
    link: string;
    description?: string;
    tokens: TokenModel[];
    players: PlayerModel;

    constructor() {};
}