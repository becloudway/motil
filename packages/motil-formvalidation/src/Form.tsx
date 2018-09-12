import * as React from "react";

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

export abstract class Form extends React.Component<any, FormState> {
    props: any;
    state: any;
    functions: FormFunctions;

    target: string;
    rules: FormValidationRules;

    constructor (props: any, state: FormState, target: string, rules: FormValidationRules, functions?: FormFunctions) {
        super(props);

        this.state = {
            error: {

            },
            ...state
        }

        this.target = target;
        this.rules = rules;

        this.onSubmit = this.onSubmit.bind(this);
        this.functions = {required: this.required, max: this.max, min: this.min, ...functions};
    }

    abstract submit (e: React.FormEvent);

    onSubmit (e: React.FormEvent) {
        e.preventDefault();

        const target = this.state[this.target];

        if (this.processRules(this.rules, target)) {
            this.submit(e);
            return true;
        } else {
            return false;
        }

    }

    required (value) {
        if (typeof value !== "undefined" && value != null && value.trim().length >= 0) {
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

    processRules (rules, target) {
        let keys = Object.keys(rules);
        let final = true;

        console.log(target);

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

        this.setState({
            error: error
        });

        return final;
    }
}