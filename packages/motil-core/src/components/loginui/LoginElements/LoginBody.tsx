import * as React from "react";

export interface ILoginBodyProps {
    children?: any;
    message: string | React.ReactElement<any>;
}

export class LoginBody extends React.Component<ILoginBodyProps, any> {
    props: ILoginBodyProps;
    constructor(props: ILoginBodyProps) {
        super(props);
    }

    render(): React.ReactElement<any> {
        return (
      <div className="login-box-body">
        <p className="login-box-msg">{this.props.message}</p>
        {this.props.children}
      </div>
        );
    }
}
