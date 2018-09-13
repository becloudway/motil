import { EntryHandler } from "..";

export function bodyValidation(rules: any) {
    return function (target: EntryHandler, key: string, descriptor: any) {

        const originalMethod = descriptor.value;

        Reflect.defineMetadata("lambdalib:anotations:bodyvalidation", {decorator: "BODY-VALIDATION", rules: rules , originalMethod: originalMethod}, target, key);
    }
}

export function pathValidation(rules: any) {
    return function (target: EntryHandler, key: string, descriptor: any) {

        const originalMethod = descriptor.value;

        Reflect.defineMetadata("lambdalib:anotations:pathvalidation", {decorator: "PATH-VALIDATION", rules: rules , originalMethod: originalMethod}, target, key);
    }
}