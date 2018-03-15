export class D20 {
    public numDice: number;
    public numSides: number;

    constructor(d20string: string);
    constructor(numDice: number, numSides: number);
    constructor(d20stringOrNumDice: string | number, numSides?: number) {
        let numDice: number;
        numSides = numSides || 0;
        if (typeof d20stringOrNumDice === "string") {
            const d20string = d20stringOrNumDice;
            if (!d20string.match(/^\d+d\d+$/)) {
                throw new Error(`Invalid d20 syntax`);
            }

            const parts = d20string.split("d");
            numDice = parseInt(parts[0], 10);
            numSides = parseInt(parts[1], 10);
        } else {
            numDice = d20stringOrNumDice;
        }

        if (isNaN(numDice) || numDice < 1 || isNaN(numSides) || numSides < 1) {
            throw new Error(`Dice number and sides must be positive integers`);
        }

        this.numDice = numDice;
        this.numSides = numSides;
    }

    public roll(): number[] {
        const rolls: number[] = [];

        for (let i = 0; i < this.numDice; i++) {
            rolls.push(this.getRoll());
        }

        return rolls;
    }

    private getRoll(): number {
        // tslint:disable-next-line:no-bitwise
        return (Math.random() * this.numSides | 0) + 1;
    }
}
