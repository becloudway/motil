import "ts-jest";

import { ComponentModule } from "../ComponentModule";
import {ModuleLoader, moduleLoader} from "../ModuleLoader";

class TestModule extends ComponentModule {
    setNavigation() {
        return [
            "NAVIGATION"
        ]
    }    
    
    setRoutes() {
        return [
            "ROUTE"
        ]
    }
    setStores() {
        return { key: "FakeObject" }
    }

    onLoad() {
        console.log("Loaded")
    }

    onUnload() {
        console.log("Unloaded");
    }

}

test ("A static instance of the ModuleLoader should be defined", () => {
    expect(moduleLoader).toBeInstanceOf(ModuleLoader);
})

test("I should be able to register my ComponentModule and load it", () => {
    const moduleLoader = new ModuleLoader();
    moduleLoader.register(TestModule);
    moduleLoader.loadModules();

    expect(moduleLoader.modules.length).toBe(1);
});

test("I should be able to register my ComponentModule and get my route", () => {
    const moduleLoader = new ModuleLoader();
    moduleLoader.register(TestModule);
    moduleLoader.loadModules();

    expect(moduleLoader.getRoutes()).toContain("ROUTE");
    expect(moduleLoader.getRoutes().length).toBe(1);
});

test("I should be able to register my ComponentModule and get its routes", () => {
    const moduleLoader = new ModuleLoader();
    moduleLoader.register(TestModule);
    moduleLoader.loadModules();

    expect(moduleLoader.getNavigation()).toContain("NAVIGATION");
    expect(moduleLoader.getNavigation().length).toBe(1);
});

test("I should be able to register my ComponentModule and get its stores", () => {
    const moduleLoader = new ModuleLoader();
    moduleLoader.register(TestModule);
    moduleLoader.loadModules();

    expect(Object.keys(moduleLoader.getStores())).toContain("key");
    expect(Object.keys(moduleLoader.getStores()).length).toBe(1);
    expect(moduleLoader.getStores().key).toBe("FakeObject");
});