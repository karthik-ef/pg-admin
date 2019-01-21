import React, { Component } from 'react';
import TextBox from '../CustomControls/TextBox';

import * as API from '../../server/api_UserManagement';
import * as Constant from '../../utils/constant';


class DeleteUser extends Component {

    getSelectedValue(value) {
        if (JSON.stringify(this.props.setData.userNameList).toLowerCase().includes(value.toLowerCase())) {
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
            this.userDetails.userId = this.props.setData.state.userManagementData.filter(m => m.UserName === this.userName)[0]["UserPermission_Id"];
            API.deleteUser.call(this);
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
                        <TextBox setData={this.props.setData.userNameList} getData={this.getSelectedValue.bind(this)} />
                    </form>
                </div>
                <div className="modal__button">
                    <input type="submit" value="Delete" onClick={this.deleteUser.bind(this)} className="btn btn-primary btn-modal" />
                </div>
            </div>
        );
    }
}
export default DeleteUser;
