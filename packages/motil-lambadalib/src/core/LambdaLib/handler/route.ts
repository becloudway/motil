import { HttpMethod } from "../enum";

import { Context, Callback } from "aws-lambda";
import { QueryResponse } from "../interfaces";

export abstract class Route {
    private _path: string;
    private _method: HttpMethod;

    private _handler: any;

    constructor (path: string, method: HttpMethod, handler: any) {
        this._path = path;
        this._method = method;

        this._handler = handler;
    }

    configuration<T>(config: T): any {};

    cleanup () : boolean { return true };

    cors () : any {}

    validateBody (body: Object): boolean { return true };

    abstract run (event: any, context: Context) : Promise<QueryResponse>;

    get path () {
        return this._path;
    }

    get httpMethod () {
        return this._method;
    }

    get handler () {
        return this._handler;
    }
}