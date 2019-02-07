import React, { Component } from 'react';
import DropDown from '../CustomControls/DropDown';
import TextBox from '../CustomControls/TextBox';

import * as API from '../../api/UserManagement';
import * as Constant from '../../utils/constant';

class EditUser extends Component {

  constructor() {
    super();
    this.state = { isVisible: true }
  }


  componentDidMount() {
    this.roles = Constant.ROLES;
    API.getUniqueContentMarkets.call(this);
  }

  BindRoles(value) {
    this.selectedUserRoles === Constant.ADMIN && value === Constant.GENERAL ? this.selectedUserMarkets = Constant.EMPTY_STRING : Constant.EMPTY_STRING;
    this.selectedUserRoles = value
    this.selectedUserRoles === Constant.ADMIN ? this.selectedUserMarkets = this.state.userMarkets.map(m => { return m.value }).toLocaleString() : Constant.EMPTY_STRING;
    this.setState({ isVisible: this.selectedUserRoles === Constant.ADMIN ? false : true });
  }

  BindMarkets(value) {
    this.selectedUserMarkets = value;
  }

  getSelectedValue(value) {
    if (value && JSON.stringify(this.props.setData.userNameList).toLowerCase().includes(value.toLowerCase())) {
      this.userName = value;
      this.isValidUser = true;
      this.selectedUserRoles = this.props.setData.state.userManagementData.filter(m => m.UserName === value)[0]["RoleName"];
      this.selectedUserMarkets = this.props.setData.state.userManagementData.filter(m => m.UserName === value).map(m => m.MarketCode);
      this.setState({ isVisible: this.selectedUserRoles === Constant.ADMIN ? false : true });
    }
    else {
      this.userName = Constant.EMPTY_STRING;
      this.isValidUser = false;
    }
  }

  updateUser() {
    if (this.isValidUser) {
      this.userDetails = {};
      this.userDetails.userName = this.userName;
      this.userDetails.rolesXml = '<userpermission xmlns=""> <role rolename ="' + this.selectedUserRoles + '"/> </userpermission>';
      this.userDetails.marketCodeXml = '<userpermission xmlns="">' + this.selectedUserMarkets.split(',').map(m => { return '<market marketCode="' + m + '"/>' }).toString().replace(/,/g, ' ') + '</userpermission>'
      API.updateUser.call(this);
    }
    else {
      alert(Constant.ERROR_INVALID_USER);
    }
  }

  render() {
    return (
      <div className="Edituser">
        <div className="modal__border">
          <h3 className="modal__title">{Constant.EDIT_USER}</h3>

          <form className="form-horizontal" >
            <div className="form-group row">
              <div className="col-sm-12">
                <TextBox setData={this.props.setData.userNameList} getData={this.getSelectedValue.bind(this)} />
              </div>
            </div>

            <div className="form-group row">
              <div className="col-sm-12">
                <DropDown Roles={this.roles} multiSelect={true} bindedRoleValue={this.BindRoles.bind(this)} SetInitalValue={this.selectedUserRoles} />
              </div>
            </div>

            {this.state.isVisible ?
              <div className="form-group row">
                <div className="col-sm-12">
                  <DropDown Markets={this.state.userMarkets} multiSelect={true} bindedMarketValue={this.BindMarkets.bind(this)} SetInitalValue={this.selectedUserMarkets} />
                </div>
              </div>
              : ''}
          </form>
        </div>

        <div className="modal__button">
          <input type="submit" value="Update User" onClick={this.updateUser.bind(this)} className="btn btn-primary btn-modal" />
        </div>

      </div>
    );
  }
}
export default EditUser;
