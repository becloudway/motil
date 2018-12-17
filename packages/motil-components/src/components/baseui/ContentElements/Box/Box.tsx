import * as React from "react";

export interface IBoxProps {
    children?: any;
    boxColor?: string;
    collapsed?: boolean;
}

export class Box extends React.Component<IBoxProps, any> {
    props: IBoxProps;
    _classes: string;
    constructor(props: IBoxProps) {
        super(props);
        this._classes =
            "box box-" +
            (this.props.boxColor
                ? this.props.boxColor
                : "color " + (this.props.collapsed ? "collapsed-box" : ""));
    }

    render(): React.ReactElement<any> {
        return <div className={this._classes}>{this.props.children}</div>;
    }
}
