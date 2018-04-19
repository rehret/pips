import { Middleware, NestMiddleware, ExpressMiddleware } from "@nestjs/common";

@Middleware()
export class RequestState implements NestMiddleware {
    public resolve(): ExpressMiddleware {
        return async (req, res, next) => {
            if (!req.state) {
                req.state = {};
            }

            if (!res.state) {
                res.state = {};
            }

            return await next();
        };
    }
}
