import * as React from "react";
import { InputElement } from "./InputElement";

export class ErrorElement extends React.Component<any, any> {
  props: any;
  constructor(props) {
    super(props);
  }

  render(): React.ReactElement<any> {
    return (    <div>
        {this.props.children}
        {(this.props.error) ? <span className="errormessage"><i className="fas fa-exclamation-circle"></i> {this.props.errorMessage}</span>: ""}
      </div>);
  }
}
