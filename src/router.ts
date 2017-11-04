import * as KoaRouter from "koa-router";
import { Log } from "./log";
import { D20 } from "./models/d20";
import { D20Validator } from "./services/d20-validator";
import { PipsResponse } from "./models/pips-response";

export let Router = new KoaRouter();

Router
.get("/:d20", async ctx => {
    let d20string: string = (ctx.params.d20 as string).toLowerCase();

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

    ctx.response.header["Content-Type"] = "application/json";
    ctx.body = response;
})
.all("/:d20", async ctx => {
    ctx.throw(405);
})
.all("*", async ctx => {
    ctx.throw(404);
});
