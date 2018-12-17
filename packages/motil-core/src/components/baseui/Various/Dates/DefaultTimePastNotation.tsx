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
        const date = this.props.date;
        const timestamp = toLocalDate(date);
        return (
            <span className="sub-text">{getTimePast(timestamp)}</span>
        );
    }
}
