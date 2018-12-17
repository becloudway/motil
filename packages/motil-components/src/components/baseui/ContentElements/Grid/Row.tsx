import * as React from "react";

export interface IRowProps {
    children?: any;
}

export  class Row extends React.Component<IRowProps, any> {
    props: IRowProps;
    constructor(props: IRowProps) {
        super(props);
    }

    render(): React.ReactElement<any> {
        return <div className="row">{this.props.children}</div>;
    }
}
