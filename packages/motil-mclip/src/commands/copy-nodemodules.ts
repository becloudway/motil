import { Command } from "../command";

import chalk from "chalk";

import * as copynode from "copy-node-modules";

const DIR = process.cwd();

export default class CopyNode extends Command {
    public action(...args: string[]): void {
        const command = args.pop();

        console.log(chalk.red("Working dir: ") + DIR);
        console.log(chalk.green("-- COPY NODE MODULES --"));

        this.pack(command);
    }

    private checkPathStart(path: string): boolean {
        return path.startsWith("/") || path.startsWith(".");
    }

    private async pack(obj: any): Promise<void> {
        const input = obj.input || "/";
        const out = obj.output || `${input}dist`;

        const outPath = !this.checkPathStart(out) ? `${DIR}/${out}` : out;
        const inPath = !this.checkPathStart(input) ? `${DIR}/${input}` : input;

        const filter = (v: string) => {
            const index = v.indexOf("node_modules");
            const secondIndex = v.indexOf("node_modules", index + 1);

            return (secondIndex === -1);
        };

        copynode(input, out, { filter, devDependencies: false  }, (
            err: any,
            results: any,
        ) => {
            if (err) {
                console.error(err);
                return;
            }
            for (const i in results) {
                console.log(
                    `package name: ${results[i].name}, version: ${results[i].version}`,
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
