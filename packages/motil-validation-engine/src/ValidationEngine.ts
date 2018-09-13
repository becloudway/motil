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

export class ValidationEngine {
    props: any;
    state: any;
    functions: FormFunctions;

    target: Object;
    rules: FormValidationRules;

    constructor (target: Object, rules: FormValidationRules, functions?: FormFunctions) {
        this.rules = rules;
        this.target = target;

        this.functions = {
            required: this.required, 
            max: this.max, 
            min: this.min,
            isNumber: this.isNumber,
            isRegex: this.isRegex,
            numMin: this.numMin,
            numMax: this.numMax,
            ...functions};
    }


    required (value) {
        if (typeof value !== "undefined" && value != null && value.trim().length > 0) {
            return true;
        }

        return false;
    }

    min (value, p) {

        if (typeof value !== "undefined" && value.trim().length >= p) {
            return true;
        }

        return false;
    }

    max (value, p) {

        if (typeof value !== "undefined" && value.trim().length <= p) {
            return true;
        }
        
        return false;
    }

    numMax(value, p) {
        if (typeof value !== "undefined" && value <= p) {
            return true;
        }

        return false;
    }

    numMin(value, p) {
        if (typeof value !== "undefined" && value >= p) {
            return true;
        }

        return false;
    }

    isNumber (value, p) {
        let number = parseInt(value);
        if (typeof value !== "undefined" && !Number.isNaN(number)) {
            return true;
        }

        return false;
    }

    isRegex (value, p) {
        let regex = new RegExp(p);
        if (typeof value !== "undefined" && !regex.test(value)) {
            return true;
        } 

        return false;
    }

    processRules (rules?, target?) {
        rules = rules || this.rules;
        target = target || this.target;

        let keys = Object.keys(rules);
        let final = true;
        
        let error = {};

        for (let k of keys) {
            let keyValue = rules[k];
            let rulesSplit = keyValue.split ("|");

            for (let rule of rulesSplit) {
                let params = rule.split(":");

                let f = params[0];
                let p = null;

                if (params.length > 1) {
                    p = params[1];
                } 

                let result = this.functions[f](target[k], p);

                if (!result) {
                    error[k] = true;
                    final = false;

                    break;
                }
            }
        }

        return {
            isOk: final,
            errors: error
        };
    }
}