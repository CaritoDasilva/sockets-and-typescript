"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class LuckyNumbersGame {
    constructor() {
        this.luckyNumbers = {};
    }
    getWinners(number) {
        let ret = [];
        for (let key in this.luckyNumbers) {
            if (number === this.luckyNumbers[key]) {
                ret.push(key);
            }
        }
        return ret;
    }
}
exports.default = LuckyNumbersGame;
