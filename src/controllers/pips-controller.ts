import { IRouterContext } from "koa-router";
import { Controller, Param, Get, Ctx } from "routing-controllers";
import { Log } from "../log";
import { D20 } from "../models/d20";
import { PipsResponse } from "../models/pips-response";

@Controller()
export class PipsController {
    @Get("/:d20string")
    async get(@Ctx() ctx: IRouterContext, @Param("d20string") d20string: string): Promise<PipsResponse> {
        let d20: D20;
        try {
            d20 = new D20(d20string);
        }
        catch(err) {
            // error occurred during D20 instantiation, so it was a problem with the d20string
            throw ctx.throw(417, err, {d20: d20string});
        }

        let response = new PipsResponse(d20string, d20.roll());

        Log.debug({
            requestId: ctx.state.requestId,
            res: response
        }, "Sending response object");

        return response;
    }
}