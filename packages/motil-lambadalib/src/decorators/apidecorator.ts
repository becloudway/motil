import { EntryHandler } from "..";
import { HttpMethod } from "../enum";

export function Api(url: string, method: HttpMethod = HttpMethod.ANY) {
    return (target: EntryHandler, key: string, descriptor: any) => {

        const originalMethod = descriptor.value;

        Reflect.defineMetadata("lambdalib:anotations:path-" + Math.random(), {decorator: "API", method: method, url: url, key: key, originalMethod: originalMethod}, target, key);
    }
}

export function BaseUrl(url: string) {
    return (target: any) => {
        Reflect.defineMetadata("lambdalib:anotations:baseUrl", {decorator: "BASEURL", url: url}, target);
    }
}

export function Cors (origin: string = "*", credentials: boolean = true, headers: string = "Content-Type,Authorization,X-Amz-Date,X-Api-Key,X-Amz-Security-Token", methods: string = "POST, GET, PUT, DELETE, OPTIONS") {
    const cors = {
        "Access-Control-Allow-Origin" : origin,
        "Access-Control-Allow-Credentials" : credentials,
        "Access-Control-Allow-Headers" : headers,
        "Access-Control-Allow-Methods": methods
    }

    return (target: any, key?: any, descriptor?: any) => {
        Reflect.defineMetadata("lambdalib:anotations:cors", {decorator: "CORS", cors: cors}, target, key);
    }
}
