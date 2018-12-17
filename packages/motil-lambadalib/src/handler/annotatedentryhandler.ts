import { Context, Callback } from "aws-lambda";
import { DecoratorUtil } from "..";
import "reflect-metadata";
import { HttpMethod } from "../enum";

import { ValidationEngine } from "motil-validation-engine";
import { EntryHandler } from "./entryhandler";

export abstract class AnnotatedEntryHandler extends EntryHandler {

    constructor (event: any, context: Context, callback: Callback) {
        super(event, context, callback);

        this.init();
    }

    public async init () {
        this.decorate();

        if (this.method !== HttpMethod.OPTIONS) {
            await this.noOptions();
        }

        this.afterInit();
        this.executeRoute();
    }

    private decorate () {
        const decorators = DecoratorUtil.getClassDecorators(this.constructor);

        for (const decorator of decorators) {
            if (decorator.decorator === "BASEURL") {
                this.baseUrl = decorator.url;
            } else if (decorator.decorator === "CORS") {
                this.cors = decorator.cors;
            }
        }
    }

    public setExecutionMethod (decorator: any) {
        if (decorator.decorator === "API"
            && (decorator.url === "*" || this.baseUrl + decorator.url === this.event.resource)
            && (decorator.method === "*" || this.event.httpMethod === decorator.method)) {

            return decorator.originalMethod.bind(this);
        }
    }

    public setCors (decorator: any) {
        if ((decorator.decorator === "CORS" || this.cors)) {

            return (error: any, response: any) => {
                response.headers = { ...response.header, ...(decorator.cors || this.cors) };
                this.callback(error, response);
            };
        }
    }

    validatePathParameters(decorator: any) {
        if (decorator.decorator !== "PATH-VALIDATION") {
            return true;
        }

        if (this.event.pathParameters == null) {
            return false;
        }

        const validationEngine = new ValidationEngine(this.event.pathParameters, decorator.rules);
        const result = validationEngine.processRules();
        return result.isOk;
    }

    validateBody(decorator: any) {
        if (decorator.decorator !== "BODY-VALIDATION") {
            return true;
        }

        return super.validateBody(decorator.rules);
    }

    public executeRoute () {
        const names = Object.getOwnPropertyNames(Object.getPrototypeOf(this));

        let execute = null;
        const callback = this.callback;
        let newCallback = null;

        let pathValid: any = true;
        let bodyValid: any = true;

        for (const v of names) {
            const decorators = DecoratorUtil.getDecorators(this, v);
            if (decorators.length <= 0) {
                continue;
            }

            for (const d of decorators) {
                if (!execute) execute = this.setExecutionMethod(d);
                if (!newCallback) newCallback = this.setCors(d);

                if (pathValid) pathValid = this.validatePathParameters(d);
                if (bodyValid) bodyValid = this.validateBody(d);
            }

            if (execute && pathValid && bodyValid) {
                execute(this.event, this.context, this.wrapCallBack(newCallback || callback));
                return;
            } else if (!pathValid || !bodyValid) {
                callback(null, { statusCode: 404, body :  JSON.stringify({ message: "Invalid input" }) });
                return;
            }
        }
    }
}
