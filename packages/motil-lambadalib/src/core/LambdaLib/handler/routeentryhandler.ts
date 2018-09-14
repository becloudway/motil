import {Context, Callback} from "aws-lambda";
import { EntryHandler } from "./entryhandler";
import { Route } from "./route";
import { HttpMethod } from "../enum";
import { QueryResponse } from "../interfaces";


export abstract class RouteEntryHandler extends EntryHandler {
    private _routes: Array<Route> = [];
    
    constructor (event: any, context: Context, callback: Callback) {
        super(event, context, callback);
    }

    registerRoute () {
        
    }

    removeRoute () {

    }

    async init () {
        const path = this.event.resource;
        const method: HttpMethod = this.event.httpMethod;

        for (let route of this._routes) {
            if ((route.path === "*" || route.path === path + this.baseUrl)
            && route.httpMethod === "*" || route.httpMethod === method) {
                this.runRoute(route);
                return;
            }
        }
    }

    async runRoute (route: Route) {
        if (!this.validateRoute(route)) {
            console.log("Route is not valid!");
        }

        let response: QueryResponse = await this.run(route);

        this.wrapCallBack(this.callback(null, response));
    }

    validateRoute (route: Route) : boolean {
        let valid = route.validateBody(this.event.body);

        return valid;
    }

    checkCors (route: Route) {

    }

    run (route: Route): Promise<QueryResponse> {
        return new Promise(async (resolve, reject) => {
            let result;
            try {
                result = await route.run(this.event, this.context);
            } catch (ex) {
                reject(ex);
            }

            resolve(result);
        })
    }
}