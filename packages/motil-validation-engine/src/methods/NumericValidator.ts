import { ObjectValidatorExtension, ObjectValidator } from "../ObjectValidator";

export interface INumericValidator {
    numMax: (maxAmount: number) => ObjectValidator;
    numMin: (minAmount: number) => ObjectValidator;
    numEqualMax: (maxAmount: number) => ObjectValidator;
    numEqualMin: (minAmount: number) => ObjectValidator;
    numEqual: (value: number) => ObjectValidator;
}

export abstract class NumericValidator extends ObjectValidatorExtension implements INumericValidator {
    public numMax (maxAmount: number) {
        return this.custom(maxAmount, "NUMBER_MAX", "should be less than", (constraint, fieldValue) => constraint > fieldValue);
    }

    public numMin (minAmount: number) {
        return this.custom(minAmount, "NUMBER_MIN", "should be greater than", (constraint, fieldValue) => constraint < fieldValue);
    }

    public numEqualMax (maxAmount: number) {
        return this.custom(maxAmount, "NUMBER_EQUAL_MAX", "should be less or equal than", (constraint, fieldValue) => constraint >= fieldValue);
    }

    public numEqualMin (minAmount: number) {
        return this.custom(minAmount, "NUMBER_EQUAL_MIN", "should be greater or equal than", (constraint, fieldValue) => constraint <= fieldValue);
    }

    public numEqual (value: number) {
        return this.custom(value, "NUMBER_EQUAL", "should be equal to", (constraint, fieldValue) => constraint == fieldValue);
    }

    public isNum () {
        return this.custom(null, "IS_NUMBER", "value should be a number", (constrain, fieldValue: number) => isNaN(fieldValue));
    }
}