import * as React from "react";

export interface ISideBarProps {
  children?: any;
}

export  class SideBar extends React.Component<ISideBarProps> {
  props: ISideBarProps;
  constructor(props: ISideBarProps) {
    super(props);
  }

  render(): React.ReactElement<any> {
    return (
      <aside className="main-sidebar">
        <section className="sidebar">
          <ul className="sidebar-menu" data-widget="tree">
            {this.props.children}
          </ul>
        </section>
      </aside>
    );
  }
}
