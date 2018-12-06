export abstract class Command {
    private _command!: string;
    private _description!: string;
    private _options!: Array<string>;

    public abstract action () : void;

    public abstract setConfiguration () : void;

    set command (value: string) {
        this._command = value;
    }

    get command (): string {
        return this._command;
    }

    set description (value: string) {
        this._description = value;
    }

    get description (): string {
        return this._description;
    }

    set options (value: Array<string>) {
        this._options = value;
    }

    get options (): Array<string> {
        return this._options;
    }
}