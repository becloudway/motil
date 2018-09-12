import * as React from "react";

import { getDateStandardNotation, toLocalDate, getTime } from "../../../../util/DateHelper";

export interface TimeNotationProps {
    date: string;
}

export class TimeNotation extends React.Component<TimeNotationProps> {
    props!: TimeNotationProps;
    constructor (props) {
        super(props);

    }

    render () {
        let date = this.props.date;
        let timestamp = toLocalDate(date);
        return (
            <div>{getDateStandardNotation(timestamp) + " - " + getTime(timestamp)}</div>
        );
    }
}