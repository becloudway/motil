import * as React from "react";

export interface TextAreaProps extends React.DetailedHTMLProps<React.TextareaHTMLAttributes<HTMLTextAreaElement>, HTMLTextAreaElement>{
    name: string;
    value: string;
    placeholder: string;
    inputHandler: any;
    className?: string;
    sizes?: string;
    [x: string]: any;
}

export class TextareaElement extends React.Component<TextAreaProps, any> {
    props: TextAreaProps;
    constructor(props: TextAreaProps) {
        super(props);
    }

    render(): React.ReactElement<any> {
        return (
        <textarea
        className={"form-control " + (this.props.sizes || " input-sm") + (this.props.className || "") }
            placeholder={this.props.placeholder}
            name={this.props.name}
            value={this.props.value}
            onChange={this.props.inputHandler}
        />);
    }
}
