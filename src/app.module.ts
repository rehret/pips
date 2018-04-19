import { Module } from "@nestjs/common";
import { GlobalModule } from "./modules/global";
import { PipsModule } from "./modules/pips";

@Module({
    imports: [GlobalModule, PipsModule]
})
export class AppModule {}
