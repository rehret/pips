import { Module, Global, NestModule, MiddlewareConsumer } from "@nestjs/common";
import { LoggerProvider } from "./providers/logger.provider";
import { RequestState } from "./middleware/request-state";
import { RequestId } from "./middleware/request-id";
import { RequestLogger } from "./middleware/request-logger";

@Global()
@Module({
    providers: [LoggerProvider],
    exports: [LoggerProvider]
})
export class GlobalModule implements NestModule {
    public configure(consumer: MiddlewareConsumer) {
        consumer.apply([RequestState, RequestId, RequestLogger])
            .forRoutes("*");
    }
}
