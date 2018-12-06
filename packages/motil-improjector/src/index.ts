import InjectPlugin from 'webpack-inject-plugin';

export interface ModuleInjectorOptions {
    prefix?: string;
}

export class ModuleInjector {
    private options: ModuleInjectorOptions;
    
    constructor(options: ModuleInjectorOptions) {
        this.options = options || {};
    }
    
    private getInjectables (): Array<string> {
        const pathToPackage: string = process.cwd() + "/package.json";
        
        let config = require(pathToPackage);
        
        let deps = config.dependencies;
        let keys = Object.keys(deps);
        
        let injectionArray = [];
        for (let k of keys) {
            if (k.startsWith(this.options.prefix || "impojector")) {
                injectionArray.push(`import "${k}"; `);
            }
        }
    
        return injectionArray;
    }
    
    private customLoader(): () => String {
        return () => {
            let injecting = this.getInjectables().join("\n");
            return injecting;
        }
    }

    public getInjector (): any {
        return new InjectPlugin(this.customLoader());
    }
}