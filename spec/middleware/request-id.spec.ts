import { Mock, It, Times } from "typemoq";
import { stub } from "sinon";
import { IRouterContext } from "koa-router";
import * as shortid from "shortid";
import { RequestId } from "../../src/middleware/request-id";

describe("RequestId", () => {
    it("should set ctx.state.requestId to a string", async () => {
        // Arrange
        const requestId = new RequestId();
        const ctxMock = Mock.ofType<IRouterContext>();
        const stateMock = Mock.ofType<any>();
        const nextStub = stub();

        stateMock.setup((x) => x.requestId);
        ctxMock.setup((x) => x.state).returns(() => stateMock.object);

        // Act
        await requestId.use(ctxMock.object, nextStub);

        // Assert
        stateMock.verify((x) => x.requestId = It.isAnyString(), Times.once());
    });

    it("should set ctx.state.requestId to a valid shortid", async () => {
        // Arrange
        const requestId = new RequestId();
        const ctxMock = Mock.ofType<IRouterContext>();
        const stateMock = Mock.ofType<any>();
        const nextStub = stub();

        stateMock.setup((x) => x.requestId);
        ctxMock.setup((x) => x.state).returns(() => stateMock.object);

        // Act
        await requestId.use(ctxMock.object, nextStub);

        // Assert
        stateMock.verify((x) => x.requestId = It.is((val) => shortid.isValid(val)), Times.once());
    });
});
