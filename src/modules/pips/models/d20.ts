export class D20 {
    private numDice: number;
    private numSides: number;

    constructor(numDice: number, numSides: number) {
        this.numDice = 0;
        this.numSides = 0;

        this.NumDice = numDice;
        this.NumSides = numSides;
    }

    public get NumDice(): number {
        return this.numDice;
    }

    public set NumDice(value: number) {
        if (isNaN(value) || value < 1) {
            throw new Error("NumDice must be a positive integer");
        }

        this.numDice = value;
    }

    public get NumSides(): number {
        return this.numSides;
    }

    public set NumSides(value: number) {
        if (isNaN(value) || value < 1) {
            throw new Error("NumSides must be a positive integer");
        }

        this.numSides = value;
    }
}
