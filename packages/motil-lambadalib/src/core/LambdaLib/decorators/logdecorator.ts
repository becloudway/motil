import {Context, Callback} from "aws-lambda";
import { Util } from "../util";
export function Log(message: string) {
    return function (target: Object, key: string, descriptor: any) {
        Util.log("INFO", message);
    }
}