import { Route, QueryResponse, Util } from "..";
import { Context } from "aws-lambda";

export class OptionsRoute extends Route {
    
    run(event: any, context: Context): Promise<QueryResponse> {
        return new Promise (async (resolve, reject) => {
            const response: any = Util.createResponseBody();

            resolve(response);
        });
    }
}