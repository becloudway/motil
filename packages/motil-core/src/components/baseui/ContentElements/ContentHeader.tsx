import * as React from "react";

export interface IContentHeaderProps {
  titel?: string;
  description?: string;
}

export class ContentHeader extends React.Component<
  IContentHeaderProps,
  any
> {
  props: IContentHeaderProps;
  constructor(props: IContentHeaderProps) {
    super(props);
  }

  render(): React.ReactElement<any> {
    return (
      <section className="content-header">
        <h1>
          {this.props.titel}
          <small>{this.props.description}</small>
        </h1>
      </section>
    );
  }
}
