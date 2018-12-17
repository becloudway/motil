import * as React from "react";

export interface BoxHeaderProps {
    children?: any;
    classNames?: "";
}

export  class BoxHeader extends React.Component<BoxHeaderProps, any> {
    props: BoxHeaderProps;
    constructor(props: BoxHeaderProps) {
        super(props);
    }

    render(): React.ReactElement<any> {
        return <div className={"box-header " + this.props.classNames}>{this.props.children}</div>;
    }
}
