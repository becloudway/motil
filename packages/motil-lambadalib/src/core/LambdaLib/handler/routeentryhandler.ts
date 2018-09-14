import {Context, Callback} from "aws-lambda";
import { EntryHandler } from "./entryhandler";
import { Route } from "./route";
import { HttpMethod } from "../enum";
import { QueryResponse } from "../interfaces";
import { Util } from "../util";

export abstract class RouteEntryHandler extends EntryHandler {
    private _routes: Array<Route> = [];
    private _configuration: any;
    
    constructor (event: any, context: Context, callback: Callback) {
        super(event, context, callback);
    }

    abstract setup () : Promise<boolean>;
    abstract cleanup () : boolean;

    registerRoute (route: Route) {
        this._routes.push(route);
    }

    removeRoute () {

    }

    async initRoute <T> (configuration: T) {
        const path = this.event.resource;
        const method: HttpMethod = this.event.httpMethod;

        for (let route of this._routes) {
            if ((route.path === "*" || path === this.baseUrl + route.path)
            && (route.httpMethod === "*" || method === route.httpMethod)) {
                await this.runRoute<T>(route, configuration);
                break;
            }
        }
    }



    async runRoute <T> (route: Route, configuration: T) {
        await this.setup();

        route.configuration<T>(configuration);

        let response: QueryResponse;
        if (!this.validateRoute(route)) {
            response = Util.createResponseBody(403, "Invalid input");
        } else {
            response = await this.run(route);
        }

        let cors = this.checkCors();

        this.wrapCallBack(cors)(null, response);
        route.cleanup();

        this.cleanup();
    }

    validateRoute (route: Route) : boolean {
        let valid = route.validateBody(this.event.body);

        return valid;
    }

    checkCors (origin: string = "*", credentials: boolean = true, headers: string = "Content-Type,Authorization,X-Amz-Date,X-Api-Key,X-Amz-Security-Token", methods: string = "POST, GET, PUT, DELETE, OPTIONS") {
        const cors = {
            "Access-Control-Allow-Origin" : origin,
            "Access-Control-Allow-Credentials" : credentials,
            "Access-Control-Allow-Headers" : headers,
            "Access-Control-Allow-Methods": methods
        }

        return (error: any, response: any) => {
            response.headers = {...response.header, ...cors};
            this.callback(error, response);
        };
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