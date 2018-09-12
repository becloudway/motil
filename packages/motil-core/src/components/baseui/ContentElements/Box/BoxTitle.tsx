import * as React from "react";

export interface BoxTitleProps {
  children?: any;
}

export  class BoxTitle extends React.Component<BoxTitleProps, any> {
  props: BoxTitleProps;
  constructor(props: BoxTitleProps) {
    super(props);
  }

  render(): React.ReactElement<any> {
    return <h3 className="box-title">{this.props.children}</h3>;
  }
}
