import React, { Component } from 'react';

import DropDown from '../CustomControls/DropDown';

import * as API from '../../server/api_UserManagement';
import * as Constant from '../../utils/constant';

class AddUser extends Component {

  constructor() {
    super();
    this.state = { isVisible: true }
  }

  componentDidMount() {
    this.roles = Constant.ROLES;
    API.getAllMarkets.call(this);
  }

  BindRoles(value) {
    this.selectedRole === Constant.ADMIN && value === Constant.GENERAL ? this.selectedMarkets = Constant.EMPTY_STRING : Constant.EMPTY_STRING;
    this.selectedRole = value
    this.selectedRole === Constant.ADMIN ? this.selectedMarkets = this.state.userMarkets.map(m => { return m.value }).toLocaleString() : Constant.EMPTY_STRING;
    this.setState({ isVisible: this.selectedRole === Constant.ADMIN ? false : true });
  }

  BindMarkets(value) {
    this.selectedMarkets = value;
  }

  RegisterUser(e) {
    if (!this.refs.userName.value) {
      alert(Constant.ERROR_USER_EMPTY);
    }
    else if (!this.selectedRole) {
      alert(Constant.ERROR_ROLE_EMPTY);

    }
    else if (!this.selectedMarkets) {
      alert(Constant.ERROR_MARKET_EMPTY);

    }
    else if (JSON.stringify(this.props.setData.userNameList).toLowerCase().includes(this.refs.userName.value)) {
      alert(Constant.ERROR_USER_EXIST);
    }
    else {
      this.userDetails = {};
      this.userDetails.userName = this.refs.userName.value;
      this.userDetails.marketCodeXml = '<userpermission xmlns="">' + this.selectedMarkets.split(',').map(m => { return '<market marketCode="' + m + '"/>' }).toString().replace(/,/g, ' ') + '</userpermission>';
      this.userDetails.rolesXml = '<userpermission xmlns=""> <role rolename ="' + this.selectedRole + '"/> </userpermission>';
      API.registerUser.call(this);
    }
  }

  render() {
    return (
      <div className="Adduser">
        <div className="modal__border">
          <h3 className="modal__title">{Constant.ADD_USER}</h3>

          <form className="form-horizontal" >
            <div className="form-group row">
              <div className="col-sm-12">
                <input type="text" className="form-control" id="userName" ref="userName" placeholder="User Name" />
              </div>
            </div>

            <div className="form-group row">
              <div className="col-sm-12">
                <DropDown Roles={this.roles} multiSelect={true} bindedRoleValue={this.BindRoles.bind(this)} />
              </div>
            </div>

            {this.state.isVisible ?
              <div className="form-group row">
                <div className="col-sm-12">
                  <DropDown Markets={this.state.userMarkets} multiSelect={true} bindedMarketValue={this.BindMarkets.bind(this)} />
                </div>
              </div> : ''}

          </form>

        </div>
        <div className="modal__button">
          <input type="submit" value="Register" onClick={this.RegisterUser.bind(this)} className="btn btn-primary btn-modal" />
        </div>
      </div>
    );
  }
}
export default AddUser;
