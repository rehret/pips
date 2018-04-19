import { ApiModelProperty } from "@nestjs/swagger";

export class PipsResponse {
    @ApiModelProperty({ example: "1d20" })
    public request: string;

    @ApiModelProperty({ type: Number, isArray: true })
    public rolls: number[];

    constructor(request: string, rolls: number[]) {
        this.request = request;
        this.rolls = rolls;
    }
}
