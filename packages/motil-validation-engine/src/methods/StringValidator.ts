import { ObjectValidatorExtension, ObjectValidator } from "../ObjectValidator";

export interface IStringValidator {
    strMax: (maxAmount: number) => ObjectValidator;
}

export abstract class StringValidator extends ObjectValidatorExtension implements IStringValidator {
    public strMax (maxAmount: number) {
        return this.custom(maxAmount, "STRING_MAX", "length of value should be less than", (constraint, fieldValue) => constraint > fieldValue.length);
    }
}
