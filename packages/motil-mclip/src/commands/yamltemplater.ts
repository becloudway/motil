import { Command } from "../command";
import * as fs from "fs";
import chalk from "chalk";

import * as os from "os";

import { YamlUtil } from "../util/yaml";

const DIR = process.cwd();

// TODO: Add support for multiple stacks
export default class YalmTemplater extends Command {

    public action(...args: any[]): void {

        const command = args.pop();
        const action = args.shift();

        console.log(chalk.red("Working dir: ") + DIR);
        console.log(chalk.green(`-- ${chalk.bold(action)} --`));

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
        const template = obj.template || "template.yaml";
        const out = obj.outputFile || "template.build.yaml";
        const dir = obj.inputDir || "test";

        const absoluteTemplatePath = (!this.checkPathStart(template)) ? `${DIR}/${template}` : template;
        const absoluteBuildPath = (!this.checkPathStart(out)) ? `${DIR}/${out}` : out;
        const absoluteDirPath = (!this.checkPathStart(dir)) ? `${DIR}/${dir}` : dir;

        const dirs = fs.readdirSync(absoluteDirPath);

        if (!fs.existsSync(absoluteTemplatePath)) {
            console.log(chalk.red(`No template file!, ${absoluteTemplatePath}`));
            return;
        }

        const templateContent = fs.readFileSync(absoluteTemplatePath, "UTF-8");
        let snips = "";

        for (const dir of dirs) {
            const checking = `${absoluteDirPath}/${dir}`;
            const file = "/templ-snip.yaml";
            const absolute = checking + file;

            if (!fs.existsSync(absolute)) {
                console.log(chalk.magenta("Checked: ") + dir + chalk.red(" \u{274C}"));
                continue;
            }

            console.log(chalk.magenta("Checked: ") + dir + chalk.greenBright(" \u{2714}"));

            const content = fs.readFileSync(absolute, "UTF-8");

            if (!await YamlUtil.isValidYaml(content)) {
                console.log(chalk.magenta("Valid YAML: ") + dir + chalk.red(" \u{274C}"));
            } else {
                console.log(chalk.magenta("Valid YAML: ") + dir + chalk.greenBright(" \u{2714}"));
            }

            snips += os.EOL + content;

            console.log(chalk.magenta("Loading: ") + dir + chalk.greenBright(" done"));
        }

        const newTemplate = templateContent.replace("resource: '<replace>'", snips);

        if (!await YamlUtil.isValidYaml(newTemplate)) {
            console.log(chalk.red("Not a valid YAML file!"));
        } else {
            console.log(chalk.green("Valid YAML file!"));
        }

        console.log(`${chalk.green(`-- ${chalk.bold("Done: ")}`)}File written to: ${absoluteBuildPath}${chalk.green(" --")}`);
        fs.writeFileSync(absoluteBuildPath, newTemplate);

    }

    public setConfiguration(): void {
        this.command = "yaml-packer <action>";
        this.options = ["-t, --template <value>",
            "-o, --output-file <value>",
            "-i, --input-dir <value>",
            "-c --validate"];
        this.description = "Fetches templ-snips.yaml files from the sub-directories of the given --input-dir and replaces resource: '<replace>' with the content from snips in the template file";
    }

}
