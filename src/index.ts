import "./config/config";

// prerequisite for routing-controllers
import "reflect-metadata";

import * as Nconf from "nconf";
import { Log } from "./log";
import * as Koa from "koa";
import { useKoaServer, useContainer } from "routing-controllers";
import { Container } from "./config/inversify-config";
import { ui } from "swagger2-koa";

useContainer(Container);

const app = new Koa();

// tslint:disable-next-line:no-var-requires
const swaggerDoc = require("../openapi.json");
app.use(ui(swaggerDoc, "/docs"));

useKoaServer(app, {
    controllers: [`${__dirname}/controllers/*.[tj]s`],
    middlewares: [`${__dirname}/middleware/*.[tj]s`],
    defaultErrorHandler: false
});

const port = Nconf.get("PORT");
app.listen(port, () => {
    Log.info(`Listening on :${port}`);
});
