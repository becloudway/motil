import * as React from "react";


export interface IColProps {
  children?: any;
  sizes: string;
}

export  class Col extends React.Component<IColProps, any> {
  props: IColProps;
  classes: string;
  constructor(props: IColProps) {
    super(props);
    this.classes = this.props.sizes;
  }

  render(): React.ReactElement<any> {
    return <div className={this.classes}>{this.props.children}</div>;
  }
}
