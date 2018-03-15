export class PipsResponse {
    public request: string;
    public rolls: number[];

    constructor(request: string, rolls: number[]) {
        this.request = request;
        this.rolls = rolls;
    }
}
