import { expect } from "chai";
import { D20 } from "../../src/models/d20";

describe("D20 model", () => {
    describe("Constructor", () => {
        it("should accept a single string as arguments", () => {
            // Arrange
            const numDice = 1;
            const numSides = 20;
            const d20string = `${numDice}d${numSides}`;

            // Act
            const d20 = new D20(d20string);

            // Assert
            expect(d20.numDice).to.equal(numDice, "Number of dice does not match");
            expect(d20.numSides).to.equal(numSides, "Number of sides does not match");
        });

        it("should accept two numbers as arguments", () => {
            // Arrange & Act
            const numDice = 1;
            const numSides = 20;
            const d20 = new D20(numDice, numSides);

            // Assert
            expect(d20.numDice).to.equal(numDice, "Number of dice does not match");
            expect(d20.numSides).to.equal(numSides, "Number of sides does not match");
        });

        it("should throw an error if the supplied string is in an invalid format", () => {
            // Arrange
            const d20string = "1d20d10";

            // Act & Assert
            expect(() => new D20(d20string))
                .to.throw(Error, "Invalid d20 syntax");
        });

        it("should throw an error if number of dice is less than 1", () => {
            // Arrange
            const d20string = "0d20";

            // Act & Assert
            expect(() => new D20(d20string))
                .to.throw(Error, "Dice number and sides must be positive integers");
        });

        it("should throw an error if number of sides is less than 1", () => {
            // Arrange
            const d20string = "1d0";

            // Act & Assert
            expect(() => new D20(d20string))
                .to.throw(Error, "Dice number and sides must be positive integers");
        });
    });

    describe("getRoll()", () => {
        it("should return an array of positive numbers with the correct length", () => {
            // Arrange
            const numDice = 100;
            const numSides = 3;
            const d20 = new D20(`${numDice}d${numSides}`);

            // Act
            const rolls = d20.roll();

            // Assert
            expect(rolls).to.be.an("array");

            rolls.forEach((roll) => expect(roll).to.be.a("number"));

            expect(rolls).to.have.length(numDice, "Incorrect number of dice rolls");

            rolls.forEach((roll) => expect(roll).to.be.at.least(1).and.at.most(numSides));
        });
    });
});
