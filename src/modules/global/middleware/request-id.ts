import { Injectable, NestMiddleware, MiddlewareFunction } from "@nestjs/common";
import * as ShortId from "shortid";

@Injectable()
export class RequestId implements NestMiddleware {
    public resolve(): MiddlewareFunction {
        return async (req, res, next) => {
            req.state.requestId = ShortId.generate();
            res.state.requestId = req.state.requestId;
            if (next) {
                return await next();
            }
        };
    }
}
