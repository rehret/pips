import { Controller, Get, Inject, Req, Param, BadRequestException } from "@nestjs/common";
import { ApiUseTags, ApiResponse } from "@nestjs/swagger";
import * as Bunyan from "bunyan";
import { PipsResponse } from "../models/pips-response";
import { D20Service } from "../components/d20.service";
import { D20 } from "../models/d20";

@ApiUseTags("Pips")
@Controller()
export class PipsController {
    constructor(
        @Inject(Bunyan) private readonly log: Bunyan,
        private readonly d20Service: D20Service
    ) {}

    @Get("/:d20string")
    @ApiResponse({ status: 200, type: PipsResponse, description: "Successful request" })
    @ApiResponse({ status: 400, description: "Bad request" })
    public get(@Req() req: any, @Param("d20string") d20String: string): PipsResponse {
        let d20: D20;
        try {
            d20 = this.d20Service.ParseD20String(d20String);
        } catch (err) {
            // error occurred during D20 parsing, so it was a problem with the d20string
            throw new BadRequestException(err.message);
        }

        const response = new PipsResponse(d20String, this.d20Service.GetRolls(d20));

        this.log.debug({
            requestId: req.state.requestId,
            res: response
        }, "Sending response object");

        return response;
    }
}
