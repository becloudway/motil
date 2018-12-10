import { Context, Callback } from "aws-lambda";

import { QueryResponse } from "../interfaces";
import { QueryResponseObject } from "./QueryResponseObject";
import { RouteEntryHandler, AnnotatedEntryHandler } from "../handler";

export class Util {
    static wrap (Handler: any) {
        return (event: any, context: Context, callback: Callback) => 
            new Handler(event, context, callback);
    }

    static routedWrap<T> (Handler: any, config: T) {
        return (event: any, context: Context, callback: Callback) =>
            (<RouteEntryHandler> new Handler(event, context, callback)).initRoute<T>(config);
        
    }

    static createResponseBody (statusCode: number = 200, body: any = {reply: "ok"}): QueryResponse {
        return {
            statusCode: statusCode,
            body: JSON.stringify(body, null, 4)
        }
    }

    static createResponseObject(statusCode: number = 200, body: any = {reply: "ok"}): QueryResponseObject {
        return new QueryResponseObject(statusCode, body);
    }
}