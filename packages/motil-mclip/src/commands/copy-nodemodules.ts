import { Command } from "../command";

import Chalk from "chalk";

import * as copynode from "copy-node-modules";

const DIR = process.cwd();

export default class CopyNode extends Command {
    public action(...args: string[]): void {
        let command = args.pop();

        console.log(Chalk.red("Working dir: ") + DIR);
        console.log(Chalk.green("-- COPY NODE MODULES --"));

        this.pack(command);
    }

    private checkPathStart(path: string): boolean {
        return path.startsWith("/") || path.startsWith(".");
    }

    private async pack(obj: any): Promise<void> {
        let input = obj.input || "/";
        let out = obj.output || input + "dist";

        let outPath = !this.checkPathStart(out) ? DIR + "/" + out : out;
        let inPath = !this.checkPathStart(input) ? DIR + "/" + input : input;

        let filter = (v: string) => {
            let index = v.indexOf("node_modules");
            let secondIndex = v.indexOf("node_modules", index + 1);
            
            return (secondIndex == -1);
        }

        console.log(outPath, inPath);
        copynode(input, out, { devDependencies: false, filter: filter }, function(
            err: any,
            results: any
        ) {
            if (err) { 
                console.error(err);
                return;
            }
            for (var i in results) {
                console.log(
                    "package name: " +
                        results[i].name +
                        ", version: " +
                        results[i].version
                );
            }
        });
    }

    public setConfiguration(): void {
        this.command = "copy-modules";
        this.options = ["-o, --output <value>", "-i, --input <value>"];
        this.description =
            "Quickly copys node modules from target package.json to the output directory.";
    }
}
