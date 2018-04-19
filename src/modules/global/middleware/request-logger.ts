import { Middleware, NestMiddleware, Inject, ExpressMiddleware } from "@nestjs/common";
import * as Bunyan from "bunyan";

// prevent logging of constantly pinged endpoints
const ignoredUrls: string[] = [];

@Middleware()
export class RequestLogger implements NestMiddleware {
    constructor(@Inject(Bunyan) private readonly log: Bunyan) {}

    public resolve(): ExpressMiddleware {
        return async (req, _res, next) => {
            if (!ignoredUrls.includes(req.originalUrl)) {
                this.log.info({
                    requestId: req.state.requestId,
                    req
                }, "Request received");
            }
            return await next();
        };
    }
}
