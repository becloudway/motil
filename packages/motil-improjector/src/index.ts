import InjectPlugin from 'webpack-inject-plugin';

export class ModuleInjector {
    options: any;
    constructor(options) {
        this.options = options || {};
    }
    
    getInjectables () {
        const x = process;
        const pathToPackage = x.cwd() + "/package.json";
        
        let config = require(pathToPackage);
        
        let deps = config.dependencies;
        let keys = Object.keys(deps);
        
        let injectionArray = [];
        for (let k of keys) {
            if (k.startsWith(this.options.prefix || "impojector")) {
                console.log("injecting: " + k)
                injectionArray.push(`import "${k}"; `);
            }
        }
    
        return injectionArray;
    }
    
    customLoader() {
        return () => {
            let injecting = this.getInjectables().join("\n");
            console.log("injecting: ", injecting);
            return injecting;
        }
    }

    getInjector () {
        return new InjectPlugin(this.customLoader());
    }
}