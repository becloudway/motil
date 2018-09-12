import * as React from "react";
import { Link } from "react-router-dom";
export interface ILoginLogoProps {
  children?: any;
  path: string;
}

export class LoginLogo extends React.Component<ILoginLogoProps, any> {
  props: ILoginLogoProps;
  constructor(props: ILoginLogoProps) {
    super(props);
  }

  render(): React.ReactElement<any> {
    return (
      <div className="login-logo">
        <Link to={this.props.path}>{this.props.children}</Link>
      </div>
    );
  }
}
