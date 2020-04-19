interface LuckyNumberGame<T> {
    [luckyNumer: number]: T
}

export default class LuckyNumbersGame {
    public luckyNumbers: LuckyNumberGame<number> = {};

    constructor() {}

    public getWinners(number:number) {
        let ret: string[] = [];
        for (let key in this.luckyNumbers) {
            if(number === this.luckyNumbers[key]) {
                ret.push(key);
            }
        }
        return ret;
    }
}