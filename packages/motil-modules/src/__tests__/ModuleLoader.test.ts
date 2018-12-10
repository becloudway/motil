import "ts-jest";

import {ModuleLoader, moduleLoader} from "../ModuleLoader";
import { TestModule } from "./TestModule";

describe("Testing ModuleLoader", () => {
    it ("should have a static instance of the ModuleLoader defined", () => {
        expect(moduleLoader).toBeInstanceOf(ModuleLoader);
    })

    describe("with ModuleLoader instance", () => {
        let moduleLoader;

        beforeEach (() => {
            moduleLoader = new ModuleLoader();
            moduleLoader.register(TestModule);
            moduleLoader.loadModules();
        });

        afterEach(() => {
            moduleLoader = undefined;
        });

        it("should be able to register my ComponentModule and load it", () => {
            expect(moduleLoader.modules.length).toBe(1);
        });
        
        it("should be able to register my ComponentModule and get its route", () => {
            expect(moduleLoader.getRoutes()).toContain("ROUTE");
            expect(moduleLoader.getRoutes().length).toBe(1);
        });
        
        it("should be able to register my ComponentModule and get its navigation", () => {
            expect(moduleLoader.getNavigation()).toContain("NAVIGATION");
            expect(moduleLoader.getNavigation().length).toBe(1);
        });
        
        it("should be able to register my ComponentModule and get its stores", () => {
            expect(Object.keys(moduleLoader.getStores())).toContain("key");
            expect(Object.keys(moduleLoader.getStores()).length).toBe(1);
            expect(moduleLoader.getStores().key).toBe("FakeObject");
        });
    })
});

