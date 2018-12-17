import * as React from "react";

export interface IBoxToolsProps {
    children?: any;
    onClose?: any;
}

export  class BoxTools extends React.Component<IBoxToolsProps, any> {
    props: IBoxToolsProps;
    constructor(props: IBoxToolsProps) {
        super(props);
    }

    render(): React.ReactElement<any> {
        return (
            <div className="box-tools pull-right">
                {this.props.children}
                <button
                    type="button"
                    className="btn btn-box-tool"
                    data-widget="collapse"
                >
                    <i className="fa fa-minus" />
                </button>
                {this.props.onClose ? (
                    <button
                        type="button"
                        className="btn btn-box-tool"
                        data-widget="remove"
                    >
                        <i
                            className="fa fa-times"
                            onClick={this.props.onClose}
                        />
                    </button>
                ) : null}
            </div>
        );
    }
}

/*                <div className="btn-group">
            <button type="button" className="btn btn-box-tool dropdown-toggle" data-toggle="dropdown">
                <i className="fa fa-wrench"></i></button>
            <ul className="dropdown-menu" role="menu">
                {this.props.children}
            </ul>
        </div>*/
