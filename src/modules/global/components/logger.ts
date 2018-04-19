import * as Bunyan from "bunyan";
import { Config } from "./config/config";

export const Logger = Bunyan.createLogger({
    level: "trace",
    name: Config.get("APP_NAME"),
    src: Config.get("LOG_LINENUMBERS"),
    serializers: Bunyan.stdSerializers,
    streams: []
});

if (Config.get("LOG_TO_CONSOLE")) {
    Logger.addStream({
        stream: process.stdout,
        level: Config.get("LOG_LEVEL")
    });
}

if (Config.get("LOG_TO_FILE")) {
    Logger.addStream({
        type: "rotating-file",
        path: Config.get("LOG_FILE_PATH"),
        level: Config.get("LOG_LEVEL"),
        period: Config.get("LOG_FILE_ROTATION"),
        count: Config.get("LOG_FILE_COUNT")
    });
}
