import { HttpMethod } from "../enum";

import { Context, Callback } from "aws-lambda";
import { QueryResponse } from "../interfaces";

export abstract class Route {
    private _path: string;
    private _method: HttpMethod;

    constructor (path: string, method: HttpMethod) {
        this._path = path;
        this._method = method;
    }

    abstract cors () : any;

    abstract validateBody (body: Object): boolean;

    abstract run (event: any, context: Context) : Promise<QueryResponse>;

    get path () {
        return this._path;
    }

    get httpMethod () {
        return this._method;
    }
}