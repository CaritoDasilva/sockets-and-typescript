interface Iplayer{
    score: number;
    screenName: ScreenName;
}

export default class Player implements Iplayer{
    private _score: number = 0
    private _screenName: ScreenName;

    constructor(screenName: ScreenName) {
        this._screenName = screenName;
    }

    public get score(): number{
        return this._score;
    }

    public get screenName(): ScreenName {
        return this._screenName
    }

    public get player(): Iplayer {
        return <Iplayer>{ score: this._score, screenName: this._screenName }
    }

    public adjustScore(amount: number) {
        this._score += amount
    }


}