import { Injectable, NestMiddleware, Inject, MiddlewareFunction } from "@nestjs/common";
import * as Bunyan from "bunyan";

// prevent logging of constantly pinged endpoints
const ignoredUrls: string[] = [];

@Injectable()
export class RequestLogger implements NestMiddleware {
    constructor(@Inject(Bunyan) private readonly log: Bunyan) {}

    public resolve(): MiddlewareFunction {
        return async (req, _res, next) => {
            if (!ignoredUrls.includes(req.originalUrl)) {
                this.log.info({
                    requestId: req.state.requestId,
                    req
                }, "Request received");
            }

            if (next) {
                return await next();
            }
        };
    }
}
