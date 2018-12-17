import * as React from "react";

export interface IBoxFooterProps {
    children?: any;
}

export  class BoxFooter extends React.Component<IBoxFooterProps, any> {
    props: IBoxFooterProps;
    constructor(props: IBoxFooterProps) {
        super(props);
    }

    render(): React.ReactElement<any> {
        return <div className="box-footer">{this.props.children}</div>;
    }
}
