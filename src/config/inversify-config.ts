import { Container as InversifyContainer } from "inversify";
import * as Bunyan from "bunyan";
import * as Nconf from "nconf";
import { Log } from "../log";
import { RequestId } from "../middleware/request-id";
import { ErrorLogger } from "../middleware/error-logger";
import { RequestLogger } from "../middleware/request-logger";
import { PipsController } from "../controllers/pips-controller";
import { makeLoggerMiddleware } from "inversify-logger-middleware";

export const Container = new InversifyContainer();

if (Nconf.get("LOG_CONTAINER_CONFIG")) {
    Container.applyMiddleware(makeLoggerMiddleware());
}

// Logger
Container.bind<Bunyan>(Bunyan).toConstantValue(Log);

// Middleware
Container.bind<RequestId>(RequestId).toSelf();
Container.bind<ErrorLogger>(ErrorLogger).toSelf();
Container.bind<RequestLogger>(RequestLogger).toSelf();

// Controllers
Container.bind<PipsController>(PipsController).toSelf();
