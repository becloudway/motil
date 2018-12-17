import * as React from "react";
import { Link } from "react-router-dom";

export interface IHeaderProps {
    miniLogo: string;
    logo: string;
    children?: any;
}

export  class Header extends React.Component<IHeaderProps> {
    props: IHeaderProps;
    constructor(props: IHeaderProps) {
        super(props);
    }

    render(): React.ReactElement<any> {
        return (
            <header className="main-header">
                <Link to="/home" className="logo">
                    <span className="logo-mini">{this.props.miniLogo}</span>
                    <span className="logo-lg">{this.props.logo}</span>
                </Link>
                {this.props.children}
            </header>
        );
    }
}
