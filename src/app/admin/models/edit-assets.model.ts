import { TokenModel } from 'src/app/core/models/token.model';
import { CardModel } from 'src/app/core/models/card.model';
import { StoreCardModel } from 'src/app/core/models/store-card.model';

export class ElDoradoAssetsModel {
    cards: {
        backside: CardModel,
        player: CardModel[],
        store: StoreCardModel[]
    }
    tokens: TokenModel[];

    constructor() {};
}