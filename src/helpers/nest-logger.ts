import { LoggerService } from "@nestjs/common";
import { Logger } from "../modules/global/components/logger";

export class NestLogger implements LoggerService {
    public log(message: string) {
        Logger.info(message);
    }

    public error(message: string) {
        Logger.error(message);
    }

    public warn(message: string) {
        Logger.warn(message);
    }
}
