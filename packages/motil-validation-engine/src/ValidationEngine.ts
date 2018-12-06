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
    isOk: boolean,
    errors: {
        [x: string]: boolean;
    }
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
            ...functions
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
        let number = parseInt(value);
        if (typeof value !== "undefined" && !Number.isNaN(number)) {
            return true;
        }

        return false;
    }

    public static isRegex (value, p) {
        let regex = new RegExp(p);
        if (typeof value !== "undefined" && regex.test(value)) {
            return true;
        } 

        return false;
    }

    public processRules (rules?: FormValidationRules, target?: Object): ValidationResult {
        rules = rules || this.rules;
        target = target || this.target;

        let validationResult: ValidationResult = {
            isOk: false,
            errors: {}
        };

        let keys: Array<string> = Object.keys(rules);
        let final: boolean = true;
        
        let error: {[x: string]: boolean} = {};

        for (let k of keys) {
            let keyValue = rules[k];
            let rulesSplit = keyValue.split ("|");

            for (let rule of rulesSplit) {
                let params = rule.split(":");

                let validationFunction = params[0];
                let functionParameters = null;

                if (params.length > 1) {
                    functionParameters = params[1];
                } 

                let result = this.functions[validationFunction](target[k], functionParameters);

                if (!result) {
                    error[k] = true;
                    final = false;

                    break;
                }
            }
        }

        validationResult.isOk = final;
        validationResult.errors = error;

        return validationResult;
    }
}