import { Mock, It, Times } from "typemoq";
import { stub } from "sinon";
import * as shortid from "shortid";
import { RequestId } from "../../src/modules/global/middleware/request-id";

describe("RequestId", () => {
    it("should set req.state.requestId to a string", async () => {
        // Arrange
        const requestId = new RequestId();
        const requestMock = Mock.ofType<any>();
        const responseMock = Mock.ofType<any>();
        const stateMock = Mock.ofType<any>();
        const nextStub = stub();

        stateMock.setup((x) => x.requestId);
        requestMock.setup((x) => x.state).returns(() => stateMock.object);
        responseMock.setup((x) => x.state).returns(() => stateMock.object);

        // Act
        await requestId.resolve()(requestMock.object, responseMock.object, nextStub);

        // Assert
        stateMock.verify((x) => x.requestId = It.isAnyString(), Times.once());
    });

    it("should set req.state.requestId to a valid shortid", async () => {
        // Arrange
        const requestId = new RequestId();
        const requestMock = Mock.ofType<any>();
        const responseMock = Mock.ofType<any>();
        const stateMock = Mock.ofType<any>();
        const nextStub = stub();

        stateMock.setup((x) => x.requestId);
        requestMock.setup((x) => x.state).returns(() => stateMock.object);
        responseMock.setup((x) => x.state).returns(() => stateMock.object);

        // Act
        await requestId.resolve()(requestMock.object, responseMock.object, nextStub);

        // Assert
        stateMock.verify((x) => x.requestId = It.is((val) => shortid.isValid(val)), Times.once());
    });
});
