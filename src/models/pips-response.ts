export class PipsResponse {
    request: string;
    rolls: Array<number>;

    constructor(request: string, rolls: Array<number>) {
        this.request = request;
        this.rolls = rolls;
    }
}
