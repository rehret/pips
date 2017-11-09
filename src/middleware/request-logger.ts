import * as Router from "koa-router";
import { KoaMiddlewareInterface, Middleware } from "routing-controllers";
import { Log } from "../log";

// prevent logging of constantly pinged endpoints
const ignoredUrls: string[] = [];

@Middleware({ type: "before" })
export class RequestLogger implements KoaMiddlewareInterface {
    async use(ctx: Router.IRouterContext, next: (err?: any) => Promise<any>): Promise<any> {
        if (!ignoredUrls.includes(ctx.originalUrl)) {
            Log.info({
                requestId: ctx.state.requestId,
                req: ctx.request
            }, "Request received");
        }
        return await next();
    }
}
