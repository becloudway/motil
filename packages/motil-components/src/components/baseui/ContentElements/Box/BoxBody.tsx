import * as React from "react";

export interface IBoxBodyProps {
    children?: any;
    classNames?: any;
}

export  class BoxBody extends React.Component<IBoxBodyProps, any> {
    props: IBoxBodyProps;
    constructor(props: IBoxBodyProps) {
        super(props);
    }

    render(): React.ReactElement<any> {
        return <div className={"box-body " + this.props.classNames}>{this.props.children}</div>;
    }
}
