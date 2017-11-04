import * as Router from "koa-router";
import { Log } from "../log";

// prevent logging of constantly pinged endpoints
const ignoredUrls: string[] = [];

export const RequestLogger: Router.IMiddleware = async (ctx, next) => {
    if (!ignoredUrls.includes(ctx.originalUrl)) {
        Log.info({
            requestId: ctx.state.requestId,
            method: ctx.method,
            url: ctx.originalUrl
        }, "Request received");
    }
    await next();
}
