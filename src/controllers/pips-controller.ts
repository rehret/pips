import { IRouterContext } from "koa-router";
import { Controller, Param, Get, Ctx } from "routing-controllers";
import { Log } from "../log";
import { D20 } from "../models/d20";
import { D20Validator } from "../services/d20-validator";
import { PipsResponse } from "../models/pips-response";

@Controller()
export class PipsController {
    @Get("/:d20")
    get(@Ctx() ctx: IRouterContext, @Param("d20") d20string: string) {
        if (!D20Validator.validate(d20string)) {
            ctx.throw(417, "Invalid d20 syntax", {d20: d20string});
        }

        let d20 = new D20(d20string);

        if (!D20Validator.validate(d20)) {
            ctx.throw(417, "Dice number and sides must be positive integers", {d20: d20string});
        }

        let response = new PipsResponse(d20string, d20.roll());

        Log.debug({
            requestId: ctx.state.requestId,
            res: response
        }, "Sending response object");

        return response;
    }
}
