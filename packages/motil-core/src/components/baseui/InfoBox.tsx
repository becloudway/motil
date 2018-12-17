import * as React from "react";

export interface IconBoxProps {
    children?: any;
    text?: string;
    icon: string;
    color: string;
}

export  class InfoBox extends React.Component<IconBoxProps> {
    props: IconBoxProps;
    constructor(props: IconBoxProps) {
        super(props);
    }

    render(): React.ReactElement<any> {
        return (
      <div className="info-box">
        <span className={"info-box-icon bg-" + this.props.color}>
          <i className={this.props.icon} />
        </span>

        <div className="info-box-content info-box-link-content">
          {this.props.text ? (
            <h3 className="info-box-link-text">{this.props.text}</h3>
          ) : null}
          {this.props.children}
        </div>
      </div>
        );
    }
}
