import { Mock, It, Times } from "typemoq";
import { expect } from "chai";
import * as Bunyan from "bunyan";
import { PipsController } from "../../src/modules/pips/controllers/pips.controller";
import { PipsResponse } from "../../src/modules/pips/models/pips-response";
import { D20Service } from "../../src/modules/pips/components/d20.service";

describe("PipsController", () => {
    describe("get()", () => {
        it("should return an instance of PipsResponse", () => {
            // Arrange
            const logMock = Mock.ofType<Bunyan>();
            const requestMock = Mock.ofType<any>();
            const d20ServiceMock = Mock.ofType<D20Service>();
            const pipsController = new PipsController(logMock.object, d20ServiceMock.object);

            const requestString = "1d20";

            // Act
            const response = pipsController.get(requestMock.object, requestString);

            // Assert
            expect(response).to.be.an.instanceof(PipsResponse);
        });

        it("should call Bunyan.debug()", () => {
            // Arrange
            const logMock = Mock.ofType<Bunyan>();
            const requestMock = Mock.ofType<any>();
            const d20ServiceMock = Mock.ofType<D20Service>();
            const pipsController = new PipsController(logMock.object, d20ServiceMock.object);

            const requestString = "1d20";

            logMock.setup((x) => x.debug(It.isAny(), It.isAnyString()));

            // Act
            pipsController.get(requestMock.object, requestString);

            // Assert
            logMock.verify((x) => x.debug(
                It.is((obj) => obj.hasOwnProperty("requestId") && obj.hasOwnProperty("res")),
                It.is((str) => str === "Sending response object")
            ), Times.once());
        });

        // tslint:disable-next-line:no-unused-expression
        it("should throw if D20Service throws an error", () => {
            // Arrange
            const logMock = Mock.ofType<Bunyan>();
            const requestMock = Mock.ofType<any>();
            const d20ServiceMock = Mock.ofType<D20Service>();
            const pipsController = new PipsController(logMock.object, d20ServiceMock.object);

            const requestString = "0d20";

            // Act & Assert
            // tslint:disable-next-line:no-unused-expression
            expect(() => pipsController.get(requestMock.object, requestString)).to.throw;
        });
    });
});
