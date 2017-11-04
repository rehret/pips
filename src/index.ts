import "./config/config";

import * as Nconf from "nconf";
import * as Koa from "koa";
import { Log } from "./log";
import { Router } from "./router";
import { RequestId } from "./middleware/request-id";
import { RequestLogger } from "./middleware/request-logger";
import { ErrorLogger } from "./middleware/error-logger";

let app = new Koa();
app.use(RequestId);
app.use(ErrorLogger);
app.use(RequestLogger);
app.use(Router.routes());

let port = Nconf.get("PORT");
app.listen(port, () => {
    Log.info(`Listening on :${port}`);
});
