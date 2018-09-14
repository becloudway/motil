
import { Context } from "aws-lambda";
import { Route } from "../handler/route";
import { QueryResponse } from "../interfaces/queryresponse";
import { Util } from "./util";

export class OptionsRoute extends Route {
    
    run(event: any, context: Context): Promise<QueryResponse> {
        return new Promise ((resolve, reject) => {
            const response: any = Util.createResponseBody();

            resolve(response);
        });
    }
}