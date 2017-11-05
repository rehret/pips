import "./config/config";

// prerequisite for routing-controllers
import "reflect-metadata";

import * as Nconf from "nconf";
import * as Koa from "koa";
import { Log } from "./log";
import { useKoaServer } from "routing-controllers";
import { RequestId } from "./middleware/request-id";
import { RequestLogger } from "./middleware/request-logger";
import { ErrorLogger } from "./middleware/error-logger";

let app = new Koa();
app.use(RequestId);
app.use(ErrorLogger);
app.use(RequestLogger);

useKoaServer(app, {
    controllers: [`${__dirname}/controllers/*.[tj]s`]
});

let port = Nconf.get("PORT");
app.listen(port, () => {
    Log.info(`Listening on :${port}`);
});
