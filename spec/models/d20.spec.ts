import { expect } from "chai";
import { D20 } from "../../src/modules/pips/models/d20";

describe("D20 model", () => {
    describe("Constructor", () => {
        it("should accept two numbers as arguments", () => {
            // Arrange & Act
            const numDice = 1;
            const numSides = 20;
            const d20 = new D20(numDice, numSides);

            // Assert
            expect(d20.NumDice).to.equal(numDice, "Number of dice does not match");
            expect(d20.NumSides).to.equal(numSides, "Number of sides does not match");
        });

        it("should throw an error if number of dice is less than 1", () => {
            expect(() => new D20(0, 20))
                .to.throw(Error, "NumDice must be a positive integer");
        });

        it("should throw an error if number of sides is less than 1", () => {
            expect(() => new D20(1, 0))
                .to.throw(Error, "NumSides must be a positive integer");
        });
    });
});
