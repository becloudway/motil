import * as React from "react";

import { ValidationEngine } from "motil-validation-engine";

export interface FormState {
    error?: any;
    [x: string]: any;
}

export interface FormProps {
    [x: string]: any;
}

export interface FormValidationRules {
    [fieldName: string]: string;
}

export interface FormFunctions {
    [functionName: string]: (value: any, param: any) => boolean;
}

export abstract class Form extends React.Component<FormProps, FormState> {
    public props: FormProps;
    public state: FormState;

    private target: string;
    private rules: FormValidationRules;

    private validationEngine: ValidationEngine;

    constructor (props: any, state: FormState, target: string, rules: FormValidationRules, functions?: FormFunctions) {
        super(props);

        this.state = {
            error: {

            },
            ...state,
        };

        this.target = target;
        this.rules = rules;

        this.validationEngine = new ValidationEngine(this.target, this.rules, functions);

        this.onSubmit = this.onSubmit.bind(this);
    }

    public abstract submit (e: React.FormEvent): any;

    public onSubmit (e: React.FormEvent) {
        e.preventDefault();

        const target: any = this.state[this.target];

        if (this.processRules(this.rules, target)) {
            this.submit(e);
            return true;
        }

        return false;
    }

    private processRules (rules: FormValidationRules, target: any): boolean {
        const result = this.validationEngine.processRules();

        this.setState({
            error: result.errors,
        });

        return result.isOk;
    }
}
