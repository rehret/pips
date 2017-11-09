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
            expect(d20.numDice).toBe(numDice, "Number of dice does not match");
            expect(d20.numSides).toBe(numSides, "Number of sides does not match");
        });

        it("should accept two numbers as arguments", () => {
            // Arrange & Act
            let numDice = 1;
            let numSides = 20;
            let d20 = new D20(numDice, numSides);

            // Assert
            expect(d20.numDice).toBe(numDice, "Number of dice does not match");
            expect(d20.numSides).toBe(numSides, "Number of sides does not match");
        });

        it("should throw an error if the supplied string is in an invalid format", () => {
            // Arrange
            let d20string = "1d20d10";

            // Act & Assert
            expect(() => new D20(d20string))
                .toThrowError(Error, "Invalid d20 syntax");
        });

        it("should throw an error if number of dice is less than 1", () => {
            // Arrange
            let d20string = "0d20";

            // Act & Assert
            expect(() => new D20(d20string))
                .toThrowError(Error, "Dice number and sides must be positive integers");
        });

        it("should throw an error if number of sides is less than 1", () => {
            // Arrange
            let d20string = "1d0";

            // Act & Assert
            expect(() => new D20(d20string))
                .toThrowError(Error, "Dice number and sides must be positive integers");
        });
    });

    describe("getRoll()", () => {
        it("should return an array of positive numbers with the correct length", () => {
            // Arrange
            let numDice = 10000;
            let numSides = 3;
            let d20 = new D20(`${numDice}d${numSides}`);

            // Act
            let rolls = d20.roll();

            // Assert
            expect(rolls.length).toBe(numDice, "Incorrect number of dice rolls");

            expect(rolls.every(roll => typeof roll === "number"))
                .toBeTruthy("Rolls contain non-number values");

            expect(rolls.every(roll => roll >= 1))
                .toBeTruthy("Dice roll less than minimum dice roll");

            expect(rolls.every(roll => roll <= numSides))
                .toBeTruthy("Dice roll greater than maximum dice roll");
        });
    });
});
