
import * as React from "react";

export interface OptionsELementProps extends React.DetailedHTMLProps<React.SelectHTMLAttributes<HTMLSelectElement>, HTMLSelectElement>{
    name: string;
    value: string;
    placeholder: string;
    inputHandler: any;
    className?: string;
    type?: string;
    options?: Array<any>;
    [x: string]: any;
}

export class OptionsElement extends React.Component<OptionsELementProps, any> {
    props: OptionsELementProps;
    constructor(props: OptionsELementProps) {
        super(props);
    }

    render(): React.ReactElement<any> {
        const options = this.props.options.map(v => {
            return (<option key={v.key || v.value} value={v.value}>
          {v.name || v.value}
        </option>);
        });

        return (
        <select
        className={"form-control " + (this.props.sizes || " input-sm") + (this.props.className || "") }
        name={this.props.name}
        value={this.props.value}
        onChange={this.props.inputHandler}
        >
            {options}
        </select>);
    }
}
