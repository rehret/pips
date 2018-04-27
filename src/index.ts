import { Config } from "./modules/global/components/config/config";
import { NestFactory } from "@nestjs/core";
import { SwaggerModule, DocumentBuilder } from "@nestjs/swagger";
import * as Bunyan from "bunyan";
import { AppModule } from "./app.module";
import { GlobalModule } from "./modules/global";
import { NestLogger } from "./helpers/nest-logger";

(async function bootstrap() {
    const app = await NestFactory.create(AppModule, {logger: new NestLogger()});

    const options = new DocumentBuilder()
        .setTitle("Pips")
        .setVersion("v2.0")
        .addTag("Pips")
        .build();
    const document = SwaggerModule.createDocument(app, options);
    SwaggerModule.setup("/docs", app, document);

    await app.listen(Config.get("PORT"));
    app.select(GlobalModule).get(Bunyan).info(`Service running on :${Config.get("PORT")}`);
})();
