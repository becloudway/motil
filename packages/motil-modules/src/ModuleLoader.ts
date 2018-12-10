import { Module } from "./module/Module";
import { ComponentModule } from "./module/ComponentModule";
import { ServiceModule } from "./module/ServiceModule";

import winston from "./util/Logger";
const logger = winston.loggers.get("default");

//TODO: Add support for ServiceModules
//TODO: Add better typings

export class ModuleLoader {
    private _enabled: boolean = false;
    private _modules: Array<ComponentModule | ServiceModule> = [];
    private _enabledModules: any = [];

    public register (module: any): void {
        this._enabledModules.push(module);
    }

    public loadModules () {
        this._modules = [];

        this._enabled = true;

        for (let module of this._enabledModules) {

            logger.info("Loading <" + module.name +">");

            let m = new module(this);

            this._modules.push(m);
            m.onLoad();
        }
    }

    public getNavigation (): Array<any> {
        let navigation = [];

        if (!this._enabled) {
            return navigation;
        }

        for (let m of this._modules) {
            if ((m instanceof ComponentModule))
                navigation.push(...m.setNavigation());
        }

        return navigation;
    }

    public getRoutes (): Array<any> {
        let routes = [];

        if (!this._enabled) {
            return routes;
        }

        for (let m of this._modules) {
            if ((m instanceof ComponentModule))
                routes.push(...m.setRoutes());
        }

        return routes;
    }

    public getStores (): {[x: string]: any} {
        let stores = {};
        
        if (!this._enabled) {
            return stores;
        }

        for (let m of this._modules) {
            if ((m instanceof ComponentModule))
                stores = {...stores, ...m.setStores()};
        }

        return stores;
    }


    get modules () {
        return this._modules;
    }

}

class StaticModuleLoader {
    static default : ModuleLoader = new ModuleLoader();
}

export const moduleLoader = StaticModuleLoader.default;