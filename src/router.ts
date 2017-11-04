import * as KoaRouter from "koa-router";
import { D20Validator } from "./services/d20-validator";

export let Router = new KoaRouter();

Router
.get("/:d20", async ctx => {
    if (!D20Validator.validate(ctx.params.d20)) {
        throw `Invalid d20 syntax: "${ctx.params.d20}"`;
    }
});
