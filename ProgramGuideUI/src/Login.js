import React, { Component } from 'react';
import $ from 'jquery';
import 'bootstrap';
import './Login.css';
import * as API from './api/login';

class Login extends Component {

    componentDidMount() {
        $(window).on('load', function () {
            $('.alert').hide();
            $('#exampleModalCenter').modal('show');
        });
    }

    handleSubmit(event) {
        this.UserDetails = {}
        this.UserDetails.userName = this.refs.emailId.value;
        this.UserDetails.password = this.refs.password.value;

        API.UserAuthentication.call(this);
        event.preventDefault();
    }

    Authorization() {
        if (this.isValidUser) {
            $('#exampleModalCenter').modal('hide');
            this.props.Authentication(true)
        }
        else {
            $('.alert').show();
        }
    }

    render() {
        return (
            <div className="modal fade bd-example-modal-sm login-modal" id="exampleModalCenter" tabIndex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true" data-backdrop="static" data-keyboard="false">
                <div className="modal-dialog modal-dialog-centered modal-sm" role="document">
                    <div className="modal-content">
                        <div className="modal-body">
                            <legend>Program Guide 2.0</legend>
                            <form className="form-horizontal" onSubmit={this.handleSubmit.bind(this)}>
                                <div className="form-group row">
                                    <div className="col-sm-12">
                                        <input type="text" className="form-control" id="inputEmail3" ref="emailId" placeholder="Email" required />
                                    </div>
                                </div>

                                <div className="form-group row">
                                    <div className="col-sm-12">
                                        <input type="password" className="form-control" id="inputPassword3" ref="password" placeholder="Password" />
                                    </div>
                                </div>
                                <div className="alert alert-danger alert-dismissible" role="alert">
                                    Login failed!
                                </div>
                                <div className="float-right">
                                    <input type="submit" value="Login" className="btn btn-primary btn-modal" />
                                </div>
                            </form>
                        </div>

                    </div>
                </div>
            </div>
        );
    }
}

export default Login;
