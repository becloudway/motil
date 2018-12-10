import { ModuleLoader } from "../ModuleLoader";
import { Module } from "./Module";

//TODO: Add support for modules that do specific things and handle these activities fi. a login module or a notification module.
export abstract class ServiceModule extends Module {
    constructor (moduleLoader: ModuleLoader) {
        super(moduleLoader);
    }
}