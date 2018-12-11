

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

// TODO: Add OPTIONAL_BUT_VALIDATE option that will still check other errors but just for the fun I guess :D
export enum Required {
    OPTIONAL = "OPTIONAL", REQUIRED = "REQUIRED", OPTIONAL_BUT_VALIDATE = "OPTIONAL_BUT_VALIDATE"
}

export interface ValidationRules {
    field: string,
    isValid: boolean,
    isRequired: Required,
    stopChain: boolean,
    value: any,
    rules: Rule[]
}

export abstract class ObjectValidatorExtension {
    public abstract custom (constraint: any, type: string, message: string, checkFunction: (constrain: any, fieldValue: any) => boolean): ObjectValidator;
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

    public custom (constraint: any, type: string, message: string, checkFunction: (constraint: any, fieldValue: any) => boolean) {
        if (this.checkRequiredField() && this._activeRule.stopChain) {
            return this;
        }

        const rule: Rule = {
            isValid: true,
            type: type,
            params: {
                constraint: constraint,
                is: undefined,
                message: message
            }
        }

        rule.params.is = this._activeRule.value;

        const isValid = checkFunction(constraint, this._activeRule.value);
        
        rule.isValid = isValid;
        this._activeRule.isValid = this._activeRule.isValid && isValid;
        this._result.isValid = this._result.isValid && isValid;

        this._activeRule.rules.push(rule);

        return this;
    }

    public setOptional () {
        this._activeRule.isRequired = Required.OPTIONAL;

        const rule: Rule = {
            isValid: true,
            type: "FIELD_REQUIREMENT",
            params: {
                constraint: Required.OPTIONAL,
                is: this._activeRule.field,
                message: "field is marked as "
            }
        }
        

        if (this.isEmpty(this._activeRule.value)) {
            this._activeRule.stopChain = true;
        }

        this._activeRule.rules.push(rule);

        return this;
    }

    private checkRequiredField () {
        if (this._activeRule.isRequired !== Required.REQUIRED) {
            return this;
        }

        const rule: Rule = {
            isValid: true,
            type: "FIELD_REQUIREMENT",
            params: {
                constraint: Required.REQUIRED,
                is: this._activeRule.field,
                message: "field is marked as "
            }
        }
        

        if (this.isEmpty(this._activeRule.value)) {
            this._activeRule.stopChain = true;

            rule.isValid = false;
            this._activeRule.isValid = false;
            this._result.isValid = false;
        }

        this._activeRule.rules.push(rule);

        return this;
    }


    public and (fieldName: string) {
        this.field(fieldName);

        return this;
    }

    public field (fieldName: string) {
        const fieldValue = this._target[fieldName];

        const newRule: ValidationRules = {
            field: fieldName,
            isRequired: Required.REQUIRED,
            value: fieldValue,
            stopChain: false,
            isValid: true,
            rules: []
        }

        this._rules.push(newRule);
        this._activeRule = newRule;

        return this;
    }

    public validate () {
        this._result.rules = this._rules;

        console.log(JSON.stringify(this._result));
        return this._result;
    }

    private isEmpty(value){
        return (value == null || value === '');
    }
}