import * as React from "react";
import { Row, Col } from "./Grid";
import { InputElement } from "../FormElements";
import { observer } from "mobx-react";

@observer
export class Pagination extends React.Component {
    props: any;
    private _timer: any;

    constructor(props: any) {
        super(props);

        this.next = this.next.bind(this);
        this.previous = this.previous.bind(this);

        this.inputHandler = this.inputHandler.bind(this);

        this._timer = null;
    }
    next () {
        this.props.store.next();
        this.refreshTimeout();
    }

    previous () {
        this.props.store.previous();
        this.refreshTimeout();
    }

    inputHandler (e: React.ChangeEvent<any>) {
        const input = parseInt(e.target.value, 10);

        this.props.store.start = (isNaN(input) ? 0 : input);
        this.refreshTimeout();
    }

    refreshTimeout () {
        clearTimeout(this._timer);
        this._timer = setTimeout(() => {
            this.props.store.get();
        },                       500);
    }

    render(): React.ReactElement<any> {
        return (
        <div>
                <Row>
                    <Col sizes="col-sm-8">
                        <button className="btn btn-primary btn-sm" onClick={this.previous} ><i className="fas fa-arrow-left"></i></button>
                        &nbsp;{`${this.props.store.start} to ${this.props.store.end} of ${this.props.store.count}`}&nbsp;
                        <button className="btn btn-primary btn-sm" onClick={this.next} ><i className="fas fa-arrow-right"></i></button>&nbsp;
                    </Col>
                    <Col sizes="col-sm-1">
                        <p>Amount: </p>
                    </Col>
                    <Col sizes="col-sm-3">
                        <InputElement type="number" value={this.props.store.start} inputHandler={this.inputHandler} placeholder={this.props.start} name="start"/>
                    </Col>
                </Row>
        </div>
        );
    }
}
