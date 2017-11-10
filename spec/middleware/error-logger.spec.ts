import { Mock, It, Times } from "typemoq";
import * as Bunyan from "bunyan";
import { IRouterContext } from "koa-router";
import { ErrorLogger } from "../../src/middleware/error-logger";

describe("ErrorLogger", () => {
    it("should call next()", () => {
        // Arrange
        let logMock = Mock.ofType<Bunyan>();
        let routerContextMock = Mock.ofType<IRouterContext>();
        let nextMock = Mock.ofType<(err?: any) => Promise<any>>();
        let errorLogger = new ErrorLogger(logMock.object);

        nextMock.setup(x => x(It.isAny())).returns(() => Promise.resolve());

        // Act
        errorLogger.use(routerContextMock.object, nextMock.object);

        // Assert
        nextMock.verify(x => x(It.isAny()), Times.once());
    });

    it("should call Bunyan.error() if an error was thrown", () => {
        // Arrange
        let logMock = Mock.ofType<Bunyan>();
        let routerContextMock = Mock.ofType<IRouterContext>();
        let nextMock = Mock.ofType<(err?: any) => Promise<any>>();
        let errorLogger = new ErrorLogger(logMock.object);

        nextMock.setup(x => x(It.isAny())).throws(new Error("Error message"));
        logMock.setup(x => x.error(It.isAny(), It.isAnyString()));

        // Act
        errorLogger.use(routerContextMock.object, nextMock.object);

        // Assert
        logMock.verify(x => x.error(
            It.is(obj => obj.hasOwnProperty("requestId") && obj.hasOwnProperty("err")),
            It.is(str => str === "Server error")
        ), Times.once());
    });

    it("should call IRouterContext.throw() if an error was thrown", () => {
        // Arrange
        let logMock = Mock.ofType<Bunyan>();
        let routerContextMock = Mock.ofType<IRouterContext>();
        let nextMock = Mock.ofType<(err?: any) => Promise<any>>();
        let errorLogger = new ErrorLogger(logMock.object);

        nextMock.setup(x => x(It.isAny())).throws(new Error("Error message"));
        routerContextMock.setup(x => x.throw(It.isAny()));

        // Act
        errorLogger.use(routerContextMock.object, nextMock.object);

        // Assert
        routerContextMock.verify(x => x.throw(It.isAny()), Times.once());
    });
});
