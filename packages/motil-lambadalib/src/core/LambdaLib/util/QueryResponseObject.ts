export class QueryResponseObject {
    private _statusCode: number;
    private _body: any;

    constructor (statusCode: number, body: any) {
        this._statusCode = statusCode;
        this._body = body;
    }

    get statusCode () {
        return this._statusCode;
    }

    set statusCode (value) {
        this._statusCode = value;
    }

    get body () {
        return JSON.stringify(this._body);
    }

    set body (value: any) {
        let result = value;
        if (typeof value === "string") {
            if (value.trim().startsWith("{")) {
                result = JSON.parse(value);
            } else {
                result = {message: value};
            }
        }

        this._body = result;
    }
}