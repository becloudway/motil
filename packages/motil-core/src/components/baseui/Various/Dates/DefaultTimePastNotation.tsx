import * as React from "react";

import { toLocalDate, getTimePast } from "../../../../util/DateHelper";

export interface TimePastNotationProps {
    date: string;
}

export class TimePastNotation extends React.Component<TimePastNotationProps> {
    props!: TimePastNotationProps;
    constructor (props) {
        super(props);

    }

    render () {
        let date = this.props.date;
        let timestamp = toLocalDate(date);
        return (
            <span className="sub-text">{getTimePast(timestamp)}</span>
        );
    }
}