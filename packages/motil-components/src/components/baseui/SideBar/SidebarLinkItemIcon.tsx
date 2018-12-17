import * as React from "react";
import { Link } from "react-router-dom";

export interface ISidebarItemIcon {
    text: string;
    icon?: string;
    dest: string;
    transform?: string;
    onClick?: any;
}

export class SidebarLinkItemIcon extends React.Component<ISidebarItemIcon> {
    props: ISidebarItemIcon;
    constructor(props: ISidebarItemIcon) {
        super(props);
    }

    render(): React.ReactElement<any> {
        return (
      <li className="active" onClick={this.props.onClick}>
        <Link to={this.props.dest}>
          <i
            className={
              this.props.icon !== undefined ? this.props.icon : "fa fa-link"
            }
            data-fa-transform={this.props.transform}
          />
          <span> {this.props.text}</span>
        </Link>
      </li>
        );
    }
}
