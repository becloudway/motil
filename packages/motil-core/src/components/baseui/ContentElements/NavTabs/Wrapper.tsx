import * as React from "react";

export interface IWraperProps {
    children?: any;
}

export class Wrapper extends React.Component<IWraperProps, any> {
    props: IWraperProps;
    constructor(props: IWraperProps) {
        super(props);
    }

    render(): React.ReactElement<any> {
        return <div className="nav-tabs-custom">{this.props.children}</div>;
    }
}
