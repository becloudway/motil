import { ObjectValidator } from "./ObjectValidator";
import { INumericValidator, NumericValidator } from "./methods/NumericValidator";

import { applyMixins } from "./util/mixins";

export class ValidationEngine extends ObjectValidator implements INumericValidator {
    constructor (target: object) {
        super(target);
    }

    // NumericValidator
    numMax: (maxAmount: number) => this;
    numMin: (minAmount: number) => this;
    numEqualMax: (maxAmount: number) => this;
    numEqualMin: (minAmount: number) => this;
    numEqual: (value: number) => this;
}

applyMixins(ValidationEngine, [NumericValidator])