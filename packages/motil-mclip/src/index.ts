#!/usr/bin/env node
import { CommandLoader, Command } from "./commandloader";
import * as Commander from "commander";
class Main {
    private _commandLoader: CommandLoader;
    constructor () {
        this._commandLoader = new CommandLoader(Commander);

    }

    init () {
        Commander.version("1.0.0");
        
        this._commandLoader.loadCommands();

        Commander.parse(process.argv);
    }
}

const main = new Main();
main.init();