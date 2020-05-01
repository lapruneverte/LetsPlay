import { TokenModel } from './token.model';

export class BoardModel {
    name: string;
    link: string;
    description?: string;
    tokens: TokenModel[];

    constructor() {};

/*     constructor(id: string, name: string, link: string){
        this.id = id;
        this.name = name;
        this.link = link;
    } */
}