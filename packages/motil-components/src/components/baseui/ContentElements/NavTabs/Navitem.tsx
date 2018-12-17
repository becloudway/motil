import * as React from "react";

export interface NavItemProps {
    target: string;
    text: string;
    active?: boolean;
}

export class NavItem extends React.Component<NavItemProps, any> {
    props: NavItemProps;
    constructor(props: NavItemProps) {
        super(props);
    }

    render(): React.ReactElement<any> {
        const active: string = this.props.active ? "active" : "";
        return (
      <li className="active">
        <a href="#activity" data-toggle="tab">
          Activity
        </a>
      </li>
        );
    }
}
