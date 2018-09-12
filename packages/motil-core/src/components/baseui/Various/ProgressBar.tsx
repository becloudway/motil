import * as React from "react";

export interface ProgressBarProps {
    percentage: number;
    color?: string;
    striped?: boolean;
}

export class ProgressBar extends React.Component {
    props!: ProgressBarProps;
    constructor (props) {
        super(props);

    }

    render () {
        let striped = "";

        if (this.props.striped) {
            striped = " progress-bar-striped";
        }
        return (
            <div className="progress-group">
                <div className="progress progress active progress-border">
                    <div className={"progress-bar progress-bar-" + (this.props.color || "primary") + striped} role="progressbar" aria-valuenow={this.props.percentage} aria-valuemin={0} aria-valuemax={100} style={{width: this.props.percentage + "%"}}>
                        <span className="sr-only">{this.props.percentage}% Complete</span>
                    </div>
                </div>
            </div>
        );
    }
}