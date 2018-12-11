import { ObjectValidator } from "./ObjectValidator";
import { INumericValidator, NumericValidator } from "./methods/NumericValidator";

import { applyMixins } from "./util/mixins";
import { IStringValidator, StringValidator } from "./methods/StringValidator";

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

    // String Validator
    strMax: (maxAmount: number) => ObjectValidator;
}

applyMixins(ValidationEngine, [NumericValidator, StringValidator])