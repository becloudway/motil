

export interface ObjectValidationResult {
    isValid: boolean,
    rules: ValidationRules[]
}

export interface Rule {
    isValid: boolean,
    type: string,
    params: {
        is: any,
        constraint: any,
        message: string
    }
}

export interface ValidationRules {
    field: string,
    isValid: boolean,
    rules: Rule[]
}

export class ObjectValidator {
    private _target: any;
    private _rules: ValidationRules[] = [];
    private _result: ObjectValidationResult = {
        isValid: true,
        rules: []
    }

    private _activeRule: ValidationRules;

    constructor (target: Object) {
        this._target = target;
    }

    public numberMax (maxAmount: number) {
        this.custom(maxAmount, "NUMBER_MAX", "should be less than", (constraint, fieldValue) => constraint > fieldValue);

        return this;
    }

    public custom (constraint: any, type: string, message: string, checkFunction: (constraint: any, fieldValue: any) => boolean) {
        const rule: Rule = {
            isValid: true,
            type: type,
            params: {
                constraint: constraint,
                is: undefined,
                message: message
            }
        }

        const fieldValue = this._target[this._activeRule.field];
        rule.params.is = fieldValue;

        const isValid = checkFunction(constraint, fieldValue);
        
        rule.isValid = isValid;
        this._activeRule.isValid = this._activeRule.isValid && isValid;
        this._result.isValid = this._result.isValid && isValid;

        this._activeRule.rules.push(rule);
    }

    public and (fieldName: string) {
        this.field(fieldName);

        return this;
    }

    public field (fieldName: string) {
        const newRule: ValidationRules = {
            field: fieldName,
            isValid: true,
            rules: []
        }

        this._rules.push(newRule);
        this._activeRule = newRule;

        return this;
    }

    public validate () {
        this._result.rules = this._rules;
        return this._result;
    }
}