import * as Commander from "commander";
import * as fs from "fs";

import { Command } from "./command";

export class CommandLoader {
    private _commands: Array<Command>;
    private _path: string = __dirname + "/commands";

    private _commander: Commander.CommanderStatic;

    constructor (commander: Commander.CommanderStatic) {
        this._commands = [];

        this._commander = commander;
    }

    public loadCommands () {
        let loadDir: String[] = fs.readdirSync(this._path);

        for (let file of loadDir) {
            let module = require(this._path + "/" + file).default;
            
            let command: Command = <Command> new module();
            command.setConfiguration();


            let com = this._commander.command(command.command);

            command.options.forEach(v => com.option(v));
            
            com.description(command.description);
            com.action(command.action.bind(command));
        }
    }
}