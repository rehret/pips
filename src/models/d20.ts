export class D20 {
    numDice: number;
    numSides: number;

    constructor(d20string: any) {
        let parts = d20string.split("d");
        this.numDice = parseInt(parts[0]);
        this.numSides = parseInt(parts[1]);
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
