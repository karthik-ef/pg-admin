import React, { Component } from 'react';
import TextBox from '../CustomControls/TextBox';
import $ from 'jquery';
import * as API from '../../api/UserManagement';
import * as Constant from '../../utils/constant';
import { connect } from 'react-redux';


class DeleteUser extends Component {

    getSelectedValue(value) {
        if (JSON.stringify(this.props.storeData._userDashboardData.map(m => { return m.UserName })
            .filter((x, i, a) => { return a.indexOf(x) === i })
            .map(m => { return { name: m } })).toLowerCase().includes(value.toLowerCase())) {
            this.userName = value;
            this.isValidUser = true;
        }
        else {
            this.userName = Constant.EMPTY_STRING;
            this.isValidUser = false;
        }
    }

    deleteUser() {
        if (this.isValidUser) {
            this.userDetails = {};
            this.userDetails.userId = this.props.storeData._userDashboardData
                .filter(m => m.UserName === this.userName)[0]["UserPermission_Id"];
            API.deleteUser.call(this);
            this.props.getDeleteUserData(true);
        }
        else {
            alert(Constant.ERROR_INVALID_USER);
        }
    }

    render() {

        return (
            <div classname="DeleteUser">
                <div className="modal__border">
                    <h3 className="modal__title">{Constant.DELETE_USER}</h3>
                    <form className="form-horizontal" >
                        <TextBox
                            setData={this.props.storeData._userDashboardData.map(m => { return m.UserName })
                                .filter((x, i, a) => { return a.indexOf(x) === i }).map(m => { return { name: m } })}
                            getData={this.getSelectedValue.bind(this)}
                        />
                    </form>
                </div>
                <div className="modal__button">
                    <input type="submit" value="Delete" onClick={this.deleteUser.bind(this)} className="btn btn-primary btn-modal" />
                </div>
            </div>
        );
    }
}
export default connect((state, props) => { return { storeData: state } })(DeleteUser);
