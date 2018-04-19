import { Module, Global, NestModule, MiddlewaresConsumer, RequestMethod } from "@nestjs/common";
import { LoggerProvider } from "./providers/logger.provider";
import { RequestState } from "./middleware/request-state";
import { RequestId } from "./middleware/request-id";
import { RequestLogger } from "./middleware/request-logger";
import { ErrorLogger } from "./exception-filters/error-logger";

@Global()
@Module({
    components: [LoggerProvider, ErrorLogger],
    exports: [LoggerProvider]
})
export class GlobalModule implements NestModule {
    public configure(consumer: MiddlewaresConsumer) {
        consumer.apply([RequestState, RequestId, RequestLogger])
            .forRoutes({ path: "*", method: RequestMethod.ALL });
    }
}
