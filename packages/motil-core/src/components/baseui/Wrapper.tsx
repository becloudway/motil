import * as React from "react";

export interface IWrapperProps {
  children?: any;
}

export  class Wrapper extends React.Component<IWrapperProps, any> {
  props: IWrapperProps;
  constructor(props: IWrapperProps) {
    super(props);
  }

  render(): React.ReactElement<any> {
    return <div className="wrapper">{this.props.children}</div>;
  }
}
