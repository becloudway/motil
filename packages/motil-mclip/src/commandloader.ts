import * as Commander from "commander";
import * as fs from "fs";

export abstract class Command {
    private _command!: string;
    private _description!: string;
    private _options!: Array<string>;

    public abstract action () : void;

    public abstract setConfiguration () : void;

    set command (value: string) {
        this._command = value;
    }

    get command () {
        return this._command;
    }

    set description (value: string) {
        this._description = value;
    }

    get description () {
        return this._description;
    }

    set options (value: Array<string>) {
        this._options = value;
    }

    get options () {
        return this._options;
    }
}

export class CommandLoader {
    private _commands: Array<Command>;
    private _path = __dirname + "/commands";

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