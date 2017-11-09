export class D20 {
    numDice: number;
    numSides: number;

    constructor(d20string: string);
    constructor(numDice: number, numSides: number);
    constructor(d20stringOrNumDice: string | number, numSides?: number) {
        let numDice: number;
        numSides = numSides || 0;
        if(typeof d20stringOrNumDice === "string") {
            let d20string = d20stringOrNumDice;
            if(!d20string.match(/^\d+d\d+$/)) {
                throw new Error(`Invalid d20 syntax`);
            }

            let parts = d20string.split("d");
            numDice = parseInt(parts[0]);
            numSides = parseInt(parts[1]);
        } else {
            numDice = d20stringOrNumDice;
        }

        if (numDice === NaN || numDice < 1 || numSides === NaN || numSides < 1) {
            throw new Error(`Dice number and sides must be positive integers`);
        }

        this.numDice = numDice;
        this.numSides = numSides;
    }

    public roll(): Array<number> {
        let rolls: Array<number> = [];

        for(let i = 0; i < this.numDice; i++) {
            rolls.push(this.getRoll());
        }

        return rolls;
    }

    private getRoll(): number {
        return (Math.random() * this.numSides | 0) + 1;
    }
}
