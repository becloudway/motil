import * as React from "react";

export interface IFormGroupProps {
  children?: any;
}

export class FormGroup extends React.Component<IFormGroupProps, any> {
  props: IFormGroupProps;
  constructor(props: IFormGroupProps) {
    super(props);
  }

  render(): React.ReactElement<any> {
    return <div className="form-group has-feedback">{this.props.children}</div>;
  }
}
