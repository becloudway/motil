
import { Context } from "aws-lambda";
import { Route } from "../handler/route";
import { QueryResponse } from "../interfaces/queryresponse";
import { Util } from "./util";

export class OptionsRoute extends Route {
    
    run(event: any, context: Context): Promise<QueryResponse> {
        return new Promise (async (resolve, reject) => {
            const response: any = Util.createResponseBody();

            resolve(response);
        });
    }
}