import * as React from "react";

export interface ILoginBoxProps {
  children?: any;
}

export class LoginBox extends React.Component<ILoginBoxProps, any> {
  props: ILoginBoxProps;
  constructor(props: ILoginBoxProps) {
    super(props);
  }

  render(): React.ReactElement<any> {
    return <div className="login-box">{this.props.children}</div>;
  }
}
