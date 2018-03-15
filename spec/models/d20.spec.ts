import { expect } from 'chai';
import { D20 } from "../../src/models/d20";

describe("D20 model", () => {
    describe("constructor", () => {
        it("should accept a single string as arguments", () => {
            // Arrange
            let numDice = 1;
            let numSides = 20;
            let d20string = `${numDice}d${numSides}`;

            // Act
            let d20 = new D20(d20string);

            // Assert
            expect(d20.numDice).to.equal(numDice, "Number of dice does not match");
            expect(d20.numSides).to.equal(numSides, "Number of sides does not match");
        });

        it("should accept two numbers as arguments", () => {
            // Arrange & Act
            let numDice = 1;
            let numSides = 20;
            let d20 = new D20(numDice, numSides);

            // Assert
            expect(d20.numDice).to.equal(numDice, "Number of dice does not match");
            expect(d20.numSides).to.equal(numSides, "Number of sides does not match");
        });

        it("should throw an error if the supplied string is in an invalid format", () => {
            // Arrange
            let d20string = "1d20d10";

            // Act & Assert
            expect(() => new D20(d20string))
                .to.throw(Error, "Invalid d20 syntax");
        });

        it("should throw an error if number of dice is less than 1", () => {
            // Arrange
            let d20string = "0d20";

            // Act & Assert
            expect(() => new D20(d20string))
                .to.throw(Error, "Dice number and sides must be positive integers");
        });

        it("should throw an error if number of sides is less than 1", () => {
            // Arrange
            let d20string = "1d0";

            // Act & Assert
            expect(() => new D20(d20string))
                .to.throw(Error, "Dice number and sides must be positive integers");
        });
    });

    describe("getRoll()", () => {
        it("should return an array of positive numbers with the correct length", () => {
            // Arrange
            let numDice = 100;
            let numSides = 3;
            let d20 = new D20(`${numDice}d${numSides}`);

            // Act
            let rolls = d20.roll();

            // Assert
            expect(rolls).to.be.an('array');

            rolls.forEach(roll => expect(roll).to.be.a('number'));

            expect(rolls).to.have.length(numDice, "Incorrect number of dice rolls");

            rolls.forEach(roll => expect(roll).to.be.at.least(1).and.at.most(numSides));
        });
    });
});
