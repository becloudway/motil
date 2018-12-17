
import { Context } from "aws-lambda";
import { Route } from "../handler/route";
import { QueryResponse } from "../interfaces/queryresponse";
import { Util } from "./util";

export class OptionsRoute extends Route {
    async run(event: any, context: Context): Promise<QueryResponse> {
        return Util.createResponseBody();
    }
}
