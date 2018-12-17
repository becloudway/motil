import * as React from "react";

export interface ISidebarHeader {
    text: string;
}

export  class SidebarHeader extends React.Component<ISidebarHeader> {
    props: ISidebarHeader;
    constructor(props: ISidebarHeader) {
        super(props);
    }

    render(): React.ReactElement<any> {
        return <li className="header">{this.props.text}</li>;
    }
}
