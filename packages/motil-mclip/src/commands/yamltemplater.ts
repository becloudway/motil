import { Command, CommandLoader } from "../commandloader";
import * as Commander from "commander";
import Chalk from "chalk";

import * as yamlLint from "yaml-lint";

import * as fs from "fs";
import chalk from "chalk";

import * as os from "os";

import {YamlUtil} from "../util/yaml";

const DIR = process.cwd();

export default class YalmTemplater extends Command {

    public action(...args: any[]): void {
        
        let command = args.pop();
        let action = args.shift();

        console.log(Chalk.red("Working dir: ") + DIR);
        console.log(Chalk.green("-- " + Chalk.bold(action) + " --"));

        switch (action) {
            case "pack": 
                this.pack(command);
            break;
        }

    }

    private checkPathStart (path: string) : boolean {
        return (path.startsWith("/") || path.startsWith("."));
    }

    private async pack (obj: any) : Promise<void> {
        let template = obj.template || "template.yaml";
        let out = obj.outputFile || "template.build.yaml";
        let dir = obj.inputDir || "test";

        let absoluteTemplatePath = (!this.checkPathStart(template)) ? DIR + "/" + template : template;
        let absoluteBuildPath = (!this.checkPathStart(out)) ? DIR + "/" + out : out;
        let absoluteDirPath = (!this.checkPathStart(dir)) ? DIR + "/" + dir : dir;

        let dirs = fs.readdirSync(absoluteDirPath);

        if (!fs.existsSync(absoluteTemplatePath)) {
            console.log(Chalk.red("No template file!, " + absoluteTemplatePath));
            return;
        }

        let templateContent = fs.readFileSync(absoluteTemplatePath, "UTF-8");
        let snips = "";
        for (let dir of dirs) {
            let checking = absoluteDirPath + "/" + dir; 
            let file = "/templ-snip.yaml";
            let absolute = checking + file;

            if (!fs.existsSync(absolute)) {
                console.log(Chalk.magenta("Checked: " ) + dir + Chalk.red(" \u{274C}") );
                continue;
            }
             
            console.log(Chalk.magenta("Checked: " ) + dir + Chalk.greenBright(" \u{2714}") );

            let content = fs.readFileSync(absolute, "UTF-8");

            
            if (!await YamlUtil.isValidYaml(content)) {
                console.log(Chalk.magenta("Valid YAML: " ) + dir + Chalk.red(" \u{274C}") );
            } else {
                console.log(Chalk.magenta("Valid YAML: " ) + dir + Chalk.greenBright(" \u{2714}") );
            }
            
            snips += os.EOL + content;

            console.log(Chalk.magenta("Loading: ") + dir + chalk.greenBright(" done"));
        }


        let newTemplate = templateContent.replace("resource: '<replace>'", snips);

        if (!await YamlUtil.isValidYaml(newTemplate)) {
            console.log(Chalk.red("Not a valid YAML file!"));
        } else {
            console.log(Chalk.green("Valid YAML file!"));
        }

        

        console.log(Chalk.green("-- " + Chalk.bold("Done: ")) + "File written to: " + absoluteBuildPath + chalk.green(" --"));
        fs.writeFileSync(absoluteBuildPath, newTemplate);

    }
    
    public setConfiguration(): void {
        this.command = "yaml-packer <action>"
        this.options = ["-t, --template <value>", 
            "-o, --output-file <value>",
            "-i, --input-dir <value>",
            "-c --validate"];
        this.description = "Fetches templ-snips.yaml files from the sub-directories of the given --input-dir and replaces resource: '<replace>' with the content from snips in the template file";
    }


}