import {Context, Callback} from "aws-lambda";
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
    }

    public async init () {

    }

    public async noOptions () {

    }

    public preInit () {

    }

    public afterInit () {

    }

    public wrapCallBack(callback: any) {
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

    validateBody(rules: any) {

        if (this.event.body == null) {
            return false;
        }

        let body = this.event.body;
        try {
            body = JSON.parse(body);
        } catch (ex) {
            return false;
        }

        let validationEngine = new ValidationEngine(body, rules);
        let result = validationEngine.processRules();

        return result.isOk;
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