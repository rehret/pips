import { expect } from "chai";
import { D20Service } from "../../src/modules/pips/components/d20.service";
import { D20 } from "../../src/modules/pips/models/d20";

describe("D20Service", () => {
    describe("ParseD20String", () => {
        it("should return an instance of D20", () => {
            // Arrange
            const d20Service = new D20Service();

            // Act
            const d20 = d20Service.ParseD20String("1d20");

            // Assert
            expect(d20).to.be.an.instanceof(D20);
        });

        it("should set NumDice and NumSides properly", () => {
            // Arrange
            const d20Service = new D20Service();

            // Act
            const d20 = d20Service.ParseD20String("1d20");

            // Assert
            expect(d20.NumDice).to.equal(1);
            expect(d20.NumSides).to.equal(20);
        });

        it("should throw an exception if the d20 string was invalid", () => {
            // Arrange
            const d20Service = new D20Service();

            // Act & Assert
            // tslint:disable-next-line:no-unused-expression
            expect(() => d20Service.ParseD20String("asdf")).to.throw;
        });
    });
});
