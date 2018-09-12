import * as React from "react";

import ReactJson from 'react-json-view';

export class AdvancedJsonTree extends React.Component {
    public props: any;

    constructor (props) {
        super(props);
    }

    render () {
        return (
        <div className="JSONTreeWrapper">
            <ReactJson src={this.props.data} collapsed={1} displayDataTypes={false} displayObjectSize={false} onEdit={this.props.onEdit || false}/>
        </div>);
    }
}