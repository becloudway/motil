import { ComponentModule } from "../module/ComponentModule";

export class TestModule extends ComponentModule {
    setNavigation() {
        return [
            "NAVIGATION"
        ];
    }

    setRoutes() {
        return [
            "ROUTE"
        ];
    }

    setStores() {
        return { key: "FakeObject" };
    }

    onLoad() {
    }

    onUnload() {
    }
}