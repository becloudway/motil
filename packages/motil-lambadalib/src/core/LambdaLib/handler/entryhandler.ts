import {Context, Callback} from "aws-lambda";
import { DecoratorUtil } from "..";
import "reflect-metadata";
import { HttpMethod } from "../enum";

import { ValidationEngine } from "motil-validation-engine";

export abstract class EntryHandler {
    private _event: any;
    private _context: Context;
    private _callback: Callback;
    private _method: HttpMethod;
    private _cors: any;

    private _valid: boolean;

    private _baseUrl: string = "";

    private _route: ((event: any, context: Context, callback: Callback) => void) | null;

    constructor (event: any, context: Context, callback: Callback) {
        this._event = event;
        this._context = context;
        this._callback = callback;

        this._method = event.httpMethod;
        
        this._route = null;

        this._valid = false;

        this.preInit();
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

    public async noOptions () {

    }

    public preInit () {

    }

    public afterInit () {

    }

    private decorate () {
        let decorators = DecoratorUtil.getClassDecorators(this.constructor);
        
        for (let decorator of decorators) {
            if (decorator.decorator === "BASEURL") {
                this.baseUrl = decorator.url;
            } else if (decorator.decorator === "CORS") {
                this.cors = decorator.cors;
            }
        }
    }

    private wrapCallBack(callback: any) {
        return (error: any, response: any) => {
            let body = response.body;
            if (typeof body === "string") {
                body = body.trim();
                try {
                    body = JSON.stringify(JSON.parse(body));
                }
                catch (ex) {
                    body = JSON.stringify({
                        message: body
                    });
                }
            } else {
                body = JSON.stringify(body);
            }

            response.body = body;
            callback(error, response);
        };
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
                response.headers = {...response.header, ...(decorator.cors || this.cors)};
                this.callback(error, response);
            };
        }
    }

    public validatePathParameters (decorator: any) {
        if (decorator.decorator !== "PATH-VALIDATION") {
            return true;
        }

        let validationEngine = new ValidationEngine(this.event.pathParameters, decorator.rules);

        return validationEngine.processRules().isOk;
    }

    public validateBody (decorator: any) {
        if (decorator.decorator !== "BODY-VALIDATION") {
            return true;
        }

        let validationEngine = new ValidationEngine(this.event.validateBody, decorator.rules);

        return validationEngine.processRules().isOk;

    }

    public executeRoute () {
        const names = Object.getOwnPropertyNames(Object.getPrototypeOf(this));
        
        let execute = null;
        let callback = this.callback;
        let newCallback = null;

        let pathValid: any = true;
        let bodyValid: any = true;

        for (let v of names) {
            let decorators = DecoratorUtil.getDecorators(this, v);
            if (decorators.length <= 0) {
                continue;
            }

            for (let d of decorators) {
                if (!execute) execute = this.setExecutionMethod(d);
                if (!newCallback) newCallback = this.setCors(d);
                
                pathValid = this.validatePathParameters(d);
                bodyValid = this.validateBody(d);
            }

        
            if (execute && pathValid && bodyValid) {

                execute(this.event, this.context, this.wrapCallBack(newCallback || callback));
                return;
            } else if (!pathValid || !bodyValid) {
                console.log("JUPTIE TELEUPTIE");
            }
        }
    }

    get event () {
        return this._event;
    }

    get context () {
        return this._context;
    }

    get callback () {
        return this._callback;
    }

    get route () {
        return this._route;
    }

    set route (value) {
        this._route = value;
    }

    get baseUrl () {
        return this._baseUrl;
    }

    set baseUrl (value) {
        this._baseUrl = value;
    }

    get method () {
        return this._method;
    }

    get cors () {
        return this._cors;
    }

    set cors (value) {
        this._cors = value;
    }
}