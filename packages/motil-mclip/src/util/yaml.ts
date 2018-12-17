import { resolve } from "path";
import chalk from "chalk";

import * as fs from "fs";

import * as yamlLint from "yaml-lint";

export class YamlUtil {
    public static isValidYaml (yamlData: string): Promise<boolean> {
        return new Promise(async (resolve) => {
            try {
              const validate = await yamlLint.lint(yamlData);
              resolve(true);
          } catch (ex) {
              console.log(Chalk.red("Error: ") + ex.name);
              console.log(Chalk.red("Message: "), ex.message);
              resolve(false);
          }
        });

    }

    public static isValidYamlFile (file: string) : Promise<boolean> {
        return new Promise(async (resolve) => {
            try {
              const fileData = fs.readFileSync(file, "UTF-8");
              const validate = await yamlLint.lint(fileData);

              resolve(true);
          } catch (ex) {
              console.log(Chalk.red("Error: ") + ex.name);
              console.log(Chalk.red("Message: "), ex.message);
              resolve(false);
          }
        });
    }
}
