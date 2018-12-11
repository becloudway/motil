import { ObjectValidator } from "./ObjectValidator";

import { INumericValidator, NumericValidator } from "./methods/NumericValidator";
import { IStringValidator, StringValidator } from "./methods/StringValidator";

import { applyMixins } from "./util/mixins";

export class ValidationEngine extends ObjectValidator implements INumericValidator, IStringValidator {
    constructor (target: object) {
        super(target);
    }

    // NumericValidator
    numMax: (maxAmount: number) => this;
    numMin: (minAmount: number) => this;
    numEqualMax: (maxAmount: number) => this;
    numEqualMin: (minAmount: number) => this;
    numEqual: (value: number) => this;
    isNum: () => this;

    // StringValidator
    strMax: (maxAmount: number) => ObjectValidator;
}

applyMixins(ValidationEngine, [NumericValidator, StringValidator]);