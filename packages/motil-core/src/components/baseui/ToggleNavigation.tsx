import * as React from "react";

export  class ToggleNavigation extends React.Component {
  render(): React.ReactElement<any> {
    return (
      <nav className="navbar navbar-static-top" role="navigation">
        <a
          href="#"
          className="sidebar-toggle"
          data-toggle="push-menu"
          role="button"
        >
          <i className="fas fa-bars" ></i>
          <span className="sr-only">Toggle navigation</span>
        </a>
      </nav>
    );
  }
}
