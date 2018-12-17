import * as _ from "lodash";

export interface FormState {
    error?: any;
    [x: string]: any;
}

export interface FormValidationRules {
    [fieldName: string]: string;
}

export interface FormFunctions {
    [functionName: string]: (value: any, param: any) => boolean;
}

export interface ValidationResult {
    isOk: boolean;
    errors: {
        [x: string]: boolean;
    };
}

export class ValidationEngine {
    private functions: FormFunctions;

    private target: Object;
    private rules: FormValidationRules;

    constructor (target: Object, rules: FormValidationRules, functions?: FormFunctions) {
        this.rules = rules;
        this.target = target;

        this.functions = {
            required: ValidationEngine.required,
            max: ValidationEngine.max,
            min: ValidationEngine.min,
            isNumber: ValidationEngine.isNumber,
            isRegex: ValidationEngine.isRegex,
            numMin: ValidationEngine.numMin,
            numMax: ValidationEngine.numMax,
            ...functions,
        };
    }

    public static required (value) {
        if (typeof value !== "undefined" && value != null && value.trim().length > 0) {
            return true;
        }

        return false;
    }

    public static min (value, p) {

        if (typeof value !== "undefined" && value.trim().length >= p) {
            return true;
        }

        return false;
    }

    public static max (value, p) {

        if (typeof value !== "undefined" && value.trim().length <= p) {
            return true;
        }

        return false;
    }

    public static numMax(value, p) {
        if (typeof value !== "undefined" && value <= p) {
            return true;
        }

        return false;
    }

    public static numMin(value, p) {
        if (typeof value !== "undefined" && value >= p) {
            return true;
        }

        return false;
    }

    public static isNumber (value) {
        const number = parseInt(value);
        if (typeof value !== "undefined" && !Number.isNaN(number)) {
            return true;
        }

        return false;
    }

    public static isRegex (value, p) {
        const regex = new RegExp(p);
        if (typeof value !== "undefined" && regex.test(value)) {
            return true;
        }

        return false;
    }

    public processRules (rules?: FormValidationRules, target?: Object): ValidationResult {
        rules = rules || this.rules;
        target = target || this.target;

        const validationResult: ValidationResult = {
            isOk: false,
            errors: {},
        };

        const keys: Array<string> = Object.keys(rules);
        let hasError: boolean = false;

        const error: {[x: string]: boolean} = {};

        let index = 0;
        while (!hasError && index < keys.length) {
            const key = keys[index++];

            const keyValue = rules[key];
            const rulesSplit = keyValue.split("|");

            for (const rule of rulesSplit) {
              const params = rule.split(":");

              const validationFunction = params[0];

              let functionParameters = null;
              if (params.length > 1) {
                functionParameters = params[1];
            }

              const result = this.functions[validationFunction](target[key], functionParameters);

              if (!result) {
                error[key] = true;
                hasError = true;
            }
          }
        }

        validationResult.isOk = !hasError;
        validationResult.errors = error;

        return validationResult;
    }
}
