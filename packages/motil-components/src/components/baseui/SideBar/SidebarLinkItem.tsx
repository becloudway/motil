import * as React from "react";
import { Link } from "react-router-dom";

export interface ISidebarLink {
    text: string;
    dest: string;
}

export  class SidebarLink extends React.Component<ISidebarLink> {
    props: ISidebarLink;
    constructor(props: ISidebarLink) {
        super(props);
    }

    render(): React.ReactElement<any> {
        return (
      <li className="active">
        <Link to={this.props.dest}>{this.props.text}</Link>
      </li>
        );
    }
}
