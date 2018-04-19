import { ExceptionFilter, Catch, Inject } from "@nestjs/common";
import * as Bunyan from "bunyan";
import { HttpException } from "@nestjs/core";

@Catch()
export class ErrorLogger implements ExceptionFilter {
    constructor(@Inject(Bunyan) private readonly log: Bunyan) {}

    public catch(exception: HttpException, response: any) {
        this.log.error({
            requestId: response.state.requestId,
            err: exception.getResponse()
        }, "Server error");

        response
            .status(exception.getStatus())
            .json(exception.getResponse());
    }
}
