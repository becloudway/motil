import { Command, CommandLoader } from "../commandloader";
import * as Commander from "commander";
import Chalk from "chalk";

import {YamlUtil} from "../util/yaml";

const DIR = process.cwd();

export default class YalmTemplater extends Command {

    public async action(...args: any[]): Promise<void> {
        
        let command = args.pop();
        let file = args.shift();

        console.log(Chalk.red("Working dir: ") + DIR);
        console.log(Chalk.green("-- Checking: " + Chalk.bold(file) + " --"));

        const check = await YamlUtil.isValidYamlFile(file);

        if (!check) {
            console.log(Chalk.red("Not VALID!"));
            process.exit(1);
        } else {
            console.log(Chalk.green("Valid!"));
        }
    }
    
    public setConfiguration(): void {
        this.command = "yaml-validator <file>"
        this.description = "Validates the given file";
        this.options = [];
    }


}