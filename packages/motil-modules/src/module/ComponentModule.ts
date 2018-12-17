import { ModuleLoader } from "../ModuleLoader";
import { Module } from "./Module";

export abstract class ComponentModule extends Module {

    constructor (moduleLoader: ModuleLoader) {
        super(moduleLoader);
    }

    abstract setNavigation (): Array<any>;
    abstract setRoutes (): Array<any>;
    abstract setStores (): Object;
}
