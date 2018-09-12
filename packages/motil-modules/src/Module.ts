import { ModuleLoader } from "./ModuleLoader";

export abstract class Module {
    private _moduleLoader: ModuleLoader;

    constructor (moduleLoader: ModuleLoader) {
        this._moduleLoader = moduleLoader;
    }
    
    abstract onLoad ();
    abstract onUnload ();
}