export class TokenModel {
    tokenId: number;
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
        this.tokenId = 1;
        this.link = "https://firebasestorage.googleapis.com/v0/b/letsplay-99d2c.appspot.com/o/tokens%2Fblack-circle.jpeg?alt=media&token=2447da9c-8967-4210-ad9f-ceae889d53cd";
    };
}