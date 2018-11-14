import * as React from "react";

import {LoginBody, LoginBox, LoginLogo} from "./LoginElements";
import { InputElement, FormGroup, LabelElement } from "../baseui/FormElements/";

import { Row, Col } from "../baseui/ContentElements/Grid";

export interface LoginFormProps {
    credentials: {
      username: string,
      password: string
    },
    inputHandler: any,
    loginHandler: any,
    title: any
}

export class LoginForm extends React.Component<any> {
    public props: LoginFormProps;
    constructor(props?: LoginFormProps) {
        super(props);
    }

    render(): React.ReactElement<any> {
        return (
            <LoginBox>
                <LoginLogo path="/">
                  <span>{this.props.title}</span> 
                </LoginLogo>
                <LoginBody message="Please login, to use the application!"
                >
                    <form onSubmit={this.props.loginHandler}>
                        <FormGroup>
                            <LabelElement for="username">Username</LabelElement>
                            <InputElement value={this.props.credentials.username} placeholder="Username" inputHandler={this.props.inputHandler} name="username"/>
                        </FormGroup>
                        <FormGroup>
                            <LabelElement for="password">Password</LabelElement>
                            <InputElement type="password" value={this.props.credentials.password} placeholder="Password" inputHandler={this.props.inputHandler} name="password"/>
                        </FormGroup>
                        <Row>
                            <div className="col-md-12">
                                <button
                                    type="submit"
                                    className="btn btn-primary btn-block"
                                >
                                    Login
                                </button>
                            </div>
                        </Row>
                    </form>

                    <hr />

                    <a>&copy; CloudWay</a>
                    <br />
                </LoginBody>
            </LoginBox>
        );
    }
}
