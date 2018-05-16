import { Module } from "@nestjs/common";
import { PipsController } from "./controllers/pips.controller";
import { D20Service } from "./components/d20.service";

@Module({
    controllers: [PipsController],
    providers: [D20Service]
})
export class PipsModule {}
