import { ObjectValidatorExtension, ObjectValidator } from "../ObjectValidator";

export interface INumericValidator {
    numMax: (maxAmount: number) => ObjectValidator;
    numMin: (minAmount: number) => ObjectValidator;
    numEqualMax: (maxAmount: number) => ObjectValidator;
    numEqualMin: (minAmount: number) => ObjectValidator;
    numEqual: (value: number) => ObjectValidator;
    isNum: () => ObjectValidator;
}

export abstract class NumericValidator extends ObjectValidatorExtension implements INumericValidator {
    private numCustom (constraint: any, type: string, message: string, checkFunction: (constraint: any, fieldValue: any) => boolean) {
        return this.custom(constraint, type, message, (constraint, fieldValue) => !isNaN(fieldValue) && checkFunction(constraint, fieldValue));
    }

    public numMax (maxAmount: number) {
        return this.numCustom(maxAmount, "NUMBER_MAX", "should be less than", (constraint, fieldValue) => constraint > fieldValue);
    }

    public numMin (minAmount: number) {
        return this.numCustom(minAmount, "NUMBER_MIN", "should be greater than", (constraint, fieldValue) => constraint < fieldValue);
    }

    public numEqualMax (maxAmount: number) {
        return this.numCustom(maxAmount, "NUMBER_EQUAL_MAX", "should be less or equal than", (constraint, fieldValue) => constraint >= fieldValue);
    }

    public numEqualMin (minAmount: number) {
        return this.numCustom(minAmount, "NUMBER_EQUAL_MIN", "should be greater or equal than", (constraint, fieldValue) => constraint <= fieldValue);
    }

    public numEqual (value: number) {
        return this.numCustom(value, "NUMBER_EQUAL", "should be equal to", (constraint, fieldValue) => constraint == fieldValue);
    }

    public isNum () {
        return this.numCustom(null, "IS_NUMBER", "value should be a number", () => true);
    }
}