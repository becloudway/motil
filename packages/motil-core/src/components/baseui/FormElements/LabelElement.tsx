import * as React from "react";

export interface FormLabelProps {
  for?: string;
  children?: any;
  [x: string]: any; 
}

export class LabelElement extends React.Component<FormLabelProps, any> {
  props: FormLabelProps;
  constructor(props: FormLabelProps) {
    super(props);
  }

  render(): React.ReactElement<any> {
    return (
        <label className="control-label" htmlFor={this.props.for}>{this.props.children}</label>
    );
  }
}
