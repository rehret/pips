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

const swaggerDoc = require("../swagger.json");
swaggerDoc.basePath = Nconf.get("BASE_PATH");
app.use(ui(swaggerDoc, "/swagger"));

useKoaServer(app, {
    controllers: [`${__dirname}/controllers/*.[tj]s`],
    middlewares: [`${__dirname}/middleware/*.[tj]s`],
    defaultErrorHandler: false
});

let port = Nconf.get("PORT");
app.listen(port, () => {
    Log.info(`Listening on :${port}`);
});
