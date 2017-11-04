import * as Nconf from "nconf";
import * as Bunyan from "bunyan";

export const Log = Bunyan.createLogger({
    level: "trace",
    name: Nconf.get("APP_NAME"),
    src: Nconf.get("LOG_LINENUMBERS"),
    serializers: Bunyan.stdSerializers,
    streams: [
        {
            stream: process.stderr,
            level: "warn"
        }
    ]
});

if (Nconf.get("LOG_TO_CONSOLE")) {
    Log.addStream({
        stream: process.stdout,
        level: Nconf.get("LOG_LEVEL")
    });
}

if (Nconf.get("LOG_TO_FILE")) {
    Log.addStream({
        type: "rotating-file",
        path: Nconf.get("LOG_FILE_PATH"),
        level: Nconf.get("LOG_LEVEL"),
        period: Nconf.get("LOG_FILE_ROTATION"),
        count: Nconf.get("LOG_FILE_COUNT")
    });
}
