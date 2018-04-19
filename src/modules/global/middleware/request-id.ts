import { Middleware, NestMiddleware, ExpressMiddleware } from "@nestjs/common";
import * as ShortId from "shortid";

@Middleware()
export class RequestId implements NestMiddleware {
    public resolve(): ExpressMiddleware {
        return async (req, res, next) => {
            req.state.requestId = ShortId.generate();
            res.state.requestId = req.state.requestId;
            return await next();
        };
    }
}
