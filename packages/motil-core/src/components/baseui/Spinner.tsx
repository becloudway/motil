import * as React from "react";

export  class Spinner extends React.Component<any> {
    props: any;
    constructor(props: any) {
        super(props);
    }

    render(): React.ReactElement<any> {
        return <i className="fas fa-spinner fa-spin loading"></i>;
    }
}
