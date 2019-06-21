import React, { Component } from 'react';
import $ from 'jquery';
import 'bootstrap';
import './Login.css';
import * as API from './api/login';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';

class Login extends Component {

    constructor() {
        super();
        this.Loading = false;
    }

    componentDidMount() {
        $(window).on('load', function () {
            $('.alert').hide();
            $('#exampleModalCenter').modal('show');
        });
    }

    handleSubmit(event) {
        this.Loading = true;
        this.setState({});
        this.UserDetails = {}
        this.UserDetails.userName = this.refs.emailId.value;
        this.UserDetails.password = this.refs.password.value;

        API.UserAuthentication.call(this);
        event.preventDefault();
    }

    Authorization() {
        if (this.isValidUser) {
            //$('#exampleModalCenter').modal('hide');
            // this.props.Authentication(true)
        }
        else {
            this.Loading = false;
            this.setState({});
            $('.alert').show();
        }
    }

    pass() {
        setTimeout(() => {
            $('#exampleModalCenter').modal('hide');
            this.props.Authentication(true)
        }, 12000);
    }

    componentDidUpdate() {
        Object.keys(this.props.storeData).length === 10
            ? this.pass()
            : this.Loading = true;
    }

    render() {
        //var progressbarCount = Object.keys(this.props.storeData).length + '0';
        var progressbarCount = Object.keys(this.props.storeData).length === 10
            ? '99'
            : Object.keys(this.props.storeData).length - 1 + '0';
        //console.log(this.props);
        //console.log(Object.keys(this.props.storeData).length);

        return (
            <div className="modal fade bd-example-modal-sm login-modal" id="exampleModalCenter" tabIndex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true" data-backdrop="static" data-keyboard="false">
                <div className="modal-dialog modal-dialog-centered modal-sm" role="document">
                    < div className="modal-content">
                        {
                            this.Loading
                                ? <div>
                                    <legend>Loading...</legend>
                                    <div className="progress">
                                        <div className="progress-bar" role="progressbar" style={{ width: progressbarCount + '%' }} aria-valuenow={progressbarCount} aria-valuemin="0" aria-valuemax="100">{progressbarCount + '%'}</div>
                                    </div>
                                </div>
                                :
                                <div className="modal-body">
                                    <legend>Program Guide 2.0</legend>
                                    <form className="form-horizontal" onSubmit={this.handleSubmit.bind(this)}>
                                        <div className="form-group row">
                                            <div className="col-sm-12">
                                                <input type="text" className="form-control" id="inputEmail3" ref="emailId" placeholder="Username" required />
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
                        }
                    </div>
                </div>
            </div >
        );
    }
}

export default withRouter(connect((state, props) => { return { storeData: state } })(Login));
