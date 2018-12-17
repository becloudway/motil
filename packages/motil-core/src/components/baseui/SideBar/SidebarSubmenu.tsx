import * as React from "react";
import { Link } from "react-router-dom";

export interface ISidebarSubmenu {
    text: string;
    icon?: string;
    children?: any;
    transform?: string;
}

export  class SidebarSubmenu extends React.Component<ISidebarSubmenu> {
    props: ISidebarSubmenu;
    constructor(props: ISidebarSubmenu) {
        super(props);
    }

    render(): React.ReactElement<any> {
        return (
      <li className="treeview">
        <a href="#">
          <i
            className={
              this.props.icon !== undefined ? this.props.icon : "fa fa-link"
            }
            data-fa-transform={this.props.transform}
          />
          <span> {this.props.text}</span>
          <span className="pull-right-container">
            <i className="fa fa-angle-left pull-right" />
          </span>
        </a>
        <ul className="treeview-menu">{this.props.children}</ul>
      </li>
        );
    }
}
