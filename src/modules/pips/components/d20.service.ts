import { D20 } from "../models/d20";

export class D20Service {
    public ParseD20String(d20String: string): D20 {
        const matches = d20String.match(/^(\d+)d(\d+)$/);
        if (matches === null) {
            throw new Error(`Invalid D20 string`);
        }

        const numDice = parseInt(matches[1], 10);
        const numSides = parseInt(matches[2], 10);

        return new D20(numDice, numSides);
    }

    public GetRolls(d20: D20): number[] {
        const rolls: number[] = [];

        for (let i = 0; i < d20.NumDice; i++) {
            rolls.push(Math.floor(Math.random() * d20.NumSides) + 1);
        }

        return rolls;
    }
}
