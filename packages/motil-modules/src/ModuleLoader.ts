import { Module } from "./Module";
import { ComponentModule } from "./ComponentModule";
import { ServiceModule } from "./ServiceModule";

//TODO: Add support for ServiceModules
//TODO: Add better typings

export class ModuleLoader {
    private _enabled: boolean = false;
    private _modules: Array<ComponentModule | ServiceModule> = [];
    private _enabledModules: any = [];

    register (module: any): void {
        this._enabledModules.push(module);
    }

    loadModules () {
        this._modules = [];

        this._enabled = true;

        for (let module of this._enabledModules) {
            console.log("Loading <" + module.name +">");

            let m = new module(this);

            this._modules.push(m);
            m.onLoad();
        }
    }

    getNavigation (): Array<any> {
        let navigation = [];
        if (!this._enabled) {
            return navigation;
        }

        for (let m of this._modules) {
            if (!(m instanceof ComponentModule))
                continue;

            navigation = [...navigation, ...m.setNavigation()];
        }

        return navigation;

    }

    getRoutes (): Array<any> {
        let routes = [];
        if (!this._enabled) {
            return routes;
        }

        for (let m of this._modules) {
            if (!(m instanceof ComponentModule))
                continue;

            routes = [...routes, ...m.setRoutes()];
        }

        return routes;
    }

    getStores (): {[x: string]: any} {
        let stores = {};
        if (!this._enabled) {
            return stores;
        }

        for (let m of this._modules) {
            if (!(m instanceof ComponentModule))
                continue;

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