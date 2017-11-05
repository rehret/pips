import { D20 } from "../../src/models/d20";

describe("D20 model", () => {
    describe("constructor", () => {
        it("should accept a single string as arguments", () => {
            // Arrange
            let d20string = "1d20";

            // Act
            let d20 = new D20(d20string);

            // Assert
            expect(d20.numDice).toBe(1);
            expect(d20.numSides).toBe(20);
        });

        it("should accept two numbers as arguments", () => {
            // Arrange & Act
            let d20 = new D20(1, 20);

            // Assert
            expect(d20.numDice).toBe(1);
            expect(d20.numSides).toBe(20);
        });

        it("should throw an error if the supplied string is in an invalid format", () => {
            // Arrange
            let d20string = "1d20d10";

            // Act & Assert
            expect(() => new D20(d20string)).toThrow("Invalid d20 syntax");
        });

        it("should throw an error if number of dice is less than 1", () => {
            // Arrange
            let d20string = "0d20";

            // Act & Assert
            expect(() => new D20(d20string)).toThrow("Dice number and sides must be positive integers");
        });

        it("should throw an error if number of sides is less than 1", () => {
            // Arrange
            let d20string = "1d0";

            // Act & Assert
            expect(() => new D20(d20string)).toThrow("Dice number and sides must be positive integers");
        });
    });

    describe("getRoll()", () => {
        it("should return an array of positive numbers with the correct length", () => {
            // Arrange
            let d20string = "5d20";
            let d20 = new D20(d20string);

            // Act
            let rolls = d20.roll();

            // Assert
            expect(rolls.length).toBe(5);
            expect(rolls.every(val => typeof val === "number")).toBe(true);
            expect(rolls.every(val => val >= 1)).toBe(true);
            expect(rolls.every(val => val <= 20)).toBe(true);
        });
    });
});
