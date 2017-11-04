import * as Router from "koa-router";
import * as ShortId from "shortid";

export const RequestId: Router.IMiddleware = async (ctx, next) => {
    ctx.state.requestId: ShortId.generate();
    await next();
}
