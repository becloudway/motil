

export interface ObjectValidationResult {
    isOk: boolean,
    rules: ValidationRules[]
}

export interface Rule {
    hasFailed: boolean,
    type: string,
    params: {
        is: any,
        constraint: any,
        message: string
    }
}

export interface ValidationRules {
    field: string,
    hasFailed: boolean,
    rules: Rule[]
}

export class ObjectValidator {
    private _target: any;
    private _rules: ValidationRules[] = [];
    private _result: ObjectValidationResult = {
        isOk: true,
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
            hasFailed: false,
            type: type,
            params: {
                constraint: constraint,
                is: undefined,
                message: message
            }
        }

        const fieldValue = this._target[this._activeRule.field];
        rule.params.is = fieldValue;

        const hasFailed = !checkFunction(constraint, fieldValue);
        
        rule.hasFailed = hasFailed;
        this._activeRule.hasFailed = this._activeRule.hasFailed || hasFailed;
        this._result.isOk = (this._result.isOk && hasFailed) ? false : this._result.isOk;

        this._activeRule.rules.push(rule);
    }

    public and (fieldName: string) {
        this.field(fieldName);

        return this;
    }

    public field (fieldName: string) {
        const newRule: ValidationRules = {
            field: fieldName,
            hasFailed: false,
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