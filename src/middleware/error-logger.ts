import * as Router from "koa-router";
import { Log } from "../log";

export const ErrorLogger: Router.IMiddleware = async (ctx, next) => {
    try {
        await next();
    }
    catch(err) {
        Log.error({
            requestId: ctx.state.requestId,
            error: err
        }, "Server error");
        ctx.throw(err);
    }
}
