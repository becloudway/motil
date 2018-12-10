import InjectPlugin from "webpack-inject-plugin";

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
        const config = require(pathToPackage);
        
        const deps = config.dependencies;
        const keys = Object.keys(deps);
        
        return keys.filter(k => k.startsWith(this.options.prefix)).map(k => `import "${k}"; `);
    }
    
    private customLoader(): () => String {
        return () => 
             this.getInjectables().join("\n");
    }

    public getInjector (): any {
        return new InjectPlugin(this.customLoader());
    }
}