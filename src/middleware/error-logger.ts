import * as Router from "koa-router";
import { KoaMiddlewareInterface, Middleware } from "routing-controllers";
import { Log } from "../log";

@Middleware({ type: "before" })
export class ErrorLogger implements KoaMiddlewareInterface {
    async use(ctx: Router.IRouterContext, next: (err?: any) => Promise<any>): Promise<any> {
        try {
            return await next();
        }
        catch(err) {
            Log.error({
                requestId: ctx.state.requestId,
                method: ctx.request.method,
                url: ctx.request.originalUrl,
                err: err
            }, "Server error");

            ctx.throw(err);
        }
    }
}
