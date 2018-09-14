import {Context, Callback} from "aws-lambda";
import Chalk from "chalk";
import { QueryResponse } from "../interfaces";
import { QueryResponseObject } from "./QueryResponseObject";
import { RouteEntryHandler, AnnotatedEntryHandler } from "../handler";

export class Util {
    static wrap (Handler: any) {
        return function (event: any, context: Context, callback: Callback) {
            return new Handler(event, context, callback);
        }
    }

    static routedWrap<T> (Handler: any, config: T) {
        return function (event: any, context: Context, callback: Callback) {
            return (<RouteEntryHandler> new Handler(event, context, callback)).initRoute<T>(config);
        }
    }

    static log (severity: string, message: string) {
        let time = new Date().toLocaleString();
        console.log(`${Chalk.red(severity)} ${time} ${Chalk.bold.magenta(">")}  ${message}`);
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