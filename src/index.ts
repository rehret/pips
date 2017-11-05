import "./config/config";

// prerequisite for routing-controllers
import "reflect-metadata";

import * as Nconf from "nconf";
import { Log } from "./log";
import { createKoaServer } from "routing-controllers";

let app = createKoaServer({
    controllers: [`${__dirname}/controllers/*.[tj]s`],
    middlewares: [`${__dirname}/middleware/*.[tj]s`],
    defaultErrorHandler: false
});

let port = Nconf.get("PORT");
app.listen(port, () => {
    Log.info(`Listening on :${port}`);
});
