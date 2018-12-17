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

    constructor(target: Object, rules: FormValidationRules, functions?: FormFunctions) {
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

    public static required(value) {
        return typeof value !== "undefined" && value != null && value.trim().length > 0;
    }

    public static min(value, p) {
        return typeof value !== "undefined" && value.trim().length >= p;
    }

    public static max(value, p) {
        return typeof value !== "undefined" && value.trim().length <= p;
    }

    public static numMax(value, p) {
        return typeof value !== "undefined" && value <= p;
    }

    public static numMin(value, p) {
        return typeof value !== "undefined" && value >= p;
    }

    public static isNumber(value) {
        return typeof value !== "undefined" && !Number.isNaN(parseInt(value, 10));
    }

    public static isRegex(value, p) {
        return typeof value !== "undefined" && new RegExp(p).test(value);
    }

    public processRules(rules?: FormValidationRules, target?: Object): ValidationResult {

        const applyRules: FormValidationRules = rules || this.rules;
        const applyTarget : Object = target || this.target;

        const validationResult: ValidationResult = {
            isOk: false,
            errors: {},
        };

        const keys: string[] = Object.keys(applyRules);
        let hasError: boolean = false;

        const error: { [x: string]: boolean } = {};

        let index = 0;
        while (!hasError && index < keys.length) {
            const key = keys[index];
            index += 1;

            const keyValue = applyRules[key];
            const rulesSplit = keyValue.split("|");

            for (const rule of rulesSplit) {
                const params = rule.split(":");

                const validationFunction = params[0];

                let functionParameters = null;
                if (params.length > 1) {
                    functionParameters = params[1];
                }

                const result = this.functions[validationFunction](applyTarget[key], functionParameters);

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
