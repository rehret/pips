import { Mock, It, Times } from "typemoq";
import { expect } from "chai";
import * as Bunyan from "bunyan";
import { IRouterContext } from "koa-router";
import { PipsController } from "../../src/controllers/pips-controller";
import { PipsResponse } from "../../src/models/pips-response";

describe("PipsController", () => {
    describe("get()", () => {
        it("should return an instance of PipsResponse", async () => {
            // Arrange
            const logMock = Mock.ofType<Bunyan>();
            const routerContextMock = Mock.ofType<IRouterContext>();
            const pipsController = new PipsController(logMock.object);

            const requestString = "1d20";

            // Act
            const response = await pipsController.get(routerContextMock.object, requestString);

            // Assert
            expect(response).to.be.an.instanceof(PipsResponse);
        });

        it("should call Bunyan.debug()", async () => {
            // Arrange
            const logMock = Mock.ofType<Bunyan>();
            const routerContextMock = Mock.ofType<IRouterContext>();
            const pipsController = new PipsController(logMock.object);

            const requestString = "1d20";

            logMock.setup((x) => x.debug(It.isAny(), It.isAnyString()));

            // Act
            await pipsController.get(routerContextMock.object, requestString);

            // Assert
            logMock.verify((x) => x.debug(
                It.is((obj) => obj.hasOwnProperty("requestId") && obj.hasOwnProperty("res")),
                It.is((str) => str === "Sending response object")
            ), Times.once());
        });

        it("should call IRouterContext.throw() if D20 constructor throws an error", () => {
            // Arrange
            const logMock = Mock.ofType<Bunyan>();
            const routerContextMock = Mock.ofType<IRouterContext>();
            const pipsController = new PipsController(logMock.object);

            const requestString = "0d20";

            routerContextMock.setup((x) => x.throw(It.isAnyNumber(), It.isAny(), It.isAny()));

            // Act
            const requestPromise = pipsController.get(routerContextMock.object, requestString);

            // Assert
            return expect(requestPromise).to.eventually.be.rejected.then(() => {
                routerContextMock.verify((x) => x.throw(
                    It.is<number>((code) => code === 417),
                    It.isAny(),
                    It.is((obj) => typeof obj === "object" && obj.hasOwnProperty("d20"))
                ), Times.once());
            });
        });
    });
});
