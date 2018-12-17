import * as React from "react";

export interface InputElementProps extends React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>{
    name: string;
    value: string;
    placeholder: string;
    inputHandler: any;
    className?: string;
    type?: string;
    sizes?: string;
    [x: string]: any;
}

export class InputElement extends React.Component<InputElementProps, any> {
    props: InputElementProps;
    constructor(props: InputElementProps) {
        super(props);
    }

    render(): React.ReactElement<any> {
        return (
        <input
            type={this.props.type || "input"}
            className={"form-control " + (this.props.sizes || " input-sm") + (this.props.className || "") }
            placeholder={this.props.placeholder}
            name={this.props.name}
            value={this.props.value}
            onChange={this.props.inputHandler}
            disabled={this.props.disabled}
            required={this.props.required}
        />);
    }
}
