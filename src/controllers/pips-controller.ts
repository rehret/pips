import { IRouterContext } from "koa-router";
import { Controller, Param, Get, Ctx } from "routing-controllers";
import { injectable, inject } from "inversify";
import * as Bunyan from "bunyan";
import { D20 } from "../models/d20";
import { PipsResponse } from "../models/pips-response";

@injectable()
@Controller()
export class PipsController {
    private log: Bunyan;

    constructor(@inject(Bunyan) test: Bunyan) {
        this.log = test;
    }

    @Get("/:d20string")
    async get(@Ctx() ctx: IRouterContext, @Param("d20string") d20string: string): Promise<PipsResponse> {
        let d20: D20;
        try {
            d20 = new D20(d20string);
        }
        catch(err) {
            // error occurred during D20 instantiation, so it was a problem with the d20string
            ctx.throw(417, err, {d20: d20string});
            throw err;
        }

        let response = new PipsResponse(d20string, d20.roll());

        this.log.debug({
            requestId: ctx.state.requestId,
            res: response
        }, "Sending response object");

        return response;
    }
}
