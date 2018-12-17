import * as React from "react";

export interface IListWraperProps {
    children?: any;
    props?: any;
}

export class ListWrapper extends React.Component<
  IListWraperProps,
  any
> {
    props: IListWraperProps;
    constructor(props: IListWraperProps) {
        super(props);
    }

    render(): React.ReactElement<any> {
        return <ul className="nav nav-tabs">{this.props.children}</ul>;
    }
}
