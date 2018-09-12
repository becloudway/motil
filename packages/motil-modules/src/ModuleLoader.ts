import { Module } from "./Module";
import { ComponentModule } from "./ComponentModule";

export class ModuleLoader {
    private _enabled: boolean = false;
    private _modules: Array<ComponentModule> = [];
    private _enabledModules: Array<any> = [];

    constructor () {
    }

    register (module: any) {
        this._enabledModules.push(module);
    }

    loadModules () {
        if (!this._enabledModules) {
            console.warn("No modules found!");
        } else {
            this._modules = [];

            this._enabled = true;

            for (let module of this._enabledModules) {
                console.debug("Loading <" + module.name +">");

                let m = new module(this);

                this._modules.push(m);
                m.onLoad();
            }
        }
    }

    getNavigation () {
        let navigation = [];
        if (!this._enabled) {
            return navigation;
        }

        for (let m of this._modules) {

            navigation = [...navigation, ...m.setNavigation()];
        }

        return navigation;

    }

    getRoutes () {
        let routes = [];
        if (!this._enabled) {
            return routes;
        }

        for (let m of this._modules) {

            routes = [...routes, ...m.setRoutes()];
        }

        return routes;
    }

    getStores () {
        let stores = {};
        if (!this._enabled) {
            return stores;
        }

        for (let m of this._modules) {

            stores = {...stores, ...m.setStores()};
        }

        return stores;
    }

}

class StaticModuleLoader {
    static default : ModuleLoader = new ModuleLoader();
}

export const moduleLoader = StaticModuleLoader.default;