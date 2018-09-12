import {Context, Callback} from "aws-lambda";
import { DecoratorUtil } from "..";
import "reflect-metadata";
import { HttpMethod } from "../enum";

export abstract class EntryHandler {
    private _event: any;
    private _context: Context;
    private _callback: Callback;
    private _method: HttpMethod;
    private _cors: any;

    private _baseUrl: string = "";

    private _route: ((event: any, context: Context, callback: Callback) => void) | null;

    constructor (event: any, context: Context, callback: Callback) {
        this._event = event;
        this._context = context;
        this._callback = callback;

        this._method = event.httpMethod;
        
        this._route = null;

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

    public executeRoute () {
        const names = Object.getOwnPropertyNames(Object.getPrototypeOf(this));
        
        let execute = null;
        let callback = this.callback;
        let corsIsSet = false;

        for (let v of names) {
            let decorators = DecoratorUtil.getDecorators(this, v);
            if (decorators.length <= 0) {
                continue;
            }
            for (let d of decorators) {
                if (d.decorator === "API"
                    && (d.url === "*" || this.baseUrl + d.url === this.event.resource)
                    && (d.method === "*" || this.event.httpMethod === d.method)) {
                    execute = d.originalMethod.bind(this);
                } 

                if ((d.decorator === "CORS" || this.cors) && !corsIsSet) {
                    corsIsSet = true;
                    callback = (error, response) => {
                        response.headers = {...response.header, ...(d.cors || this.cors)};
                        this.callback(error, response);
                    };
                }
            }
        
            if (execute) {
                execute(this.event, this.context, callback);
                return;
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