import React, { Component } from 'react';
import $ from 'jquery';
import 'bootstrap';
import Header from './Header';
import ReactDOM from 'react-dom';

class Login extends Component {

    constructor() {
        super();
        this.state = {
            isAuthenticUser: false
        }
    }

    componentDidMount() {
        $(window).on('load', function () {
            $('.alert').hide();
            $('#exampleModalCenter').modal('show');
            // $('.btn').click(function(){
            //     var email = $('#inputEmail3').val();
            //     var password = $('#inputPassword3').val();
            //     if (!(email == 'admin' && password == 'password' )){
            //         $('.alert').show();
            //     }
            //     else{
            //         // $('#exampleModalCenter').modal('hide');
            //        // ReactDOM.render(<Header />, document.getElementById('root'));
            //     }
            // });
        });
    }

    handleSubmit(event) {

        if (this.refs.emailId.value === "admin@ef.com" && this.refs.password.value === "password") {
            $('#exampleModalCenter').modal('hide');
            this.setState({ isAuthenticUser: true }, function () {
                this.props.loginDetails(this.state.isAuthenticUser);
            });
        }
        else {
            event.preventDefault();
            $('.alert').show();
        }
    }

    render() {
        return (
            <div className="modal fade bd-example-modal-sm" id="exampleModalCenter" tabIndex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true" data-backdrop="static" data-keyboard="false">
                <div className="modal-dialog modal-dialog-centered modal-sm" role="document">
                    <div className="modal-content">
                        <div className="modal-body">
                            <legend>Program Guide 2.0</legend>
                            <form className="form-horizontal" onSubmit={this.handleSubmit.bind(this)}>
                                <div className="form-group row">
                                    <div className="col-sm-12">
                                        <input type="email" className="form-control" id="inputEmail3" ref="emailId" placeholder="Email" required />
                                    </div>
                                </div>

                                <div className="form-group row">
                                    <div className="col-sm-12">
                                        <input type="password" className="form-control" id="inputPassword3" ref="password" placeholder="Password" />
                                    </div>
                                </div>
                                <div className="alert alert-danger alert-dismissible" role="alert">
                                    Login failed!
                                {/* <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                                        <span aria-hidden="true">&times;</span>
                                    </button> */}
                                </div>
                                <div className="col-sm-12 text-center">
                                    <input type="submit" value="Login" className="btn btn-primary" />
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
