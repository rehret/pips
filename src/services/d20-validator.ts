import { D20 } from "../models/d20";

export module D20Validator {
    export function validate(d20stringOrObj: string | D20): boolean {
        if (typeof d20stringOrObj === "string") {
            let parts = d20stringOrObj.split("d");
            if (parts.length !== 2) {
                return false;
            }
        } else {
            let d20 = d20stringOrObj;

            if (d20.numDice === NaN || d20.numDice < 1 || d20.numSides === NaN || d20.numSides < 1) {
                return false;
            }
        }

        return true;
    }
}
