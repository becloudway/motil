

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

    private _activeRule: ValidationRules;

    constructor (target: Object) {
        this._target = target;
    }

    public numberMax (maxAmount: number) {
        let maxRule: Rule = {
            hasFailed: false,
            type: "NUMBER_MAX",
            params: {
                constraint: maxAmount,
                is: undefined,
                message: "expected to be less than"
            }
        }

        let field = this._target[this._activeRule.field];

        maxRule.params.is = field;
        maxRule.hasFailed = field > maxAmount;
        this._activeRule.hasFailed = this._activeRule.hasFailed || maxRule.hasFailed;

        this._activeRule.rules.push(maxRule);

        return this;
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
        const validationResult: ObjectValidationResult = {
            isOk: true,
            rules: this._rules
        }

        let index = 0;
        while (validationResult.isOk && index < this._rules.length) {
            let rule = this._rules[index++];
            
            validationResult.isOk = !rule.hasFailed;
        }

        return validationResult;
    }
}