import * as Bunyan from "bunyan";
import { Logger } from "../components/logger";

export const LoggerProvider = { provide: Bunyan, useValue: Logger };
