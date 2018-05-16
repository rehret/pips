import { Injectable, NestMiddleware, MiddlewareFunction } from "@nestjs/common";

@Injectable()
export class RequestState implements NestMiddleware {
    public resolve(): MiddlewareFunction {
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
