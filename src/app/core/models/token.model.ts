export class TokenModel {
    color: string;
    link: string;
    position: {
        x: number;
        y: number;
    }

    constructor() {
        this.position = {
            x: 10,
            y: 10
        }
    };
}