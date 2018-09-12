import * as React from "react";

export interface IContentWrapperProps {
  children?: any;
}

export  class ContentWrapper extends React.Component<
  IContentWrapperProps
> {
  props: IContentWrapperProps;
  constructor(props: IContentWrapperProps) {
    super(props);
  }

  render(): React.ReactElement<any> {
    return (
      <div className="content-wrapper">
        <section className="content container-fluid">
          {this.props.children}
        </section>
      </div>
    );
  }
}
