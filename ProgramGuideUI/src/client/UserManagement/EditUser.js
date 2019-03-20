import React, { Component } from 'react';
import DropDown from '../CustomControls/DropDown';
import TextBox from '../CustomControls/TextBox';
import $ from 'jquery';
import * as API from '../../api/UserManagement';
import * as Constant from '../../utils/constant';
import { connect } from 'react-redux';

class EditUser extends Component {

  constructor() {
    super();
    this.state = { isVisible: true }
  }

  BindRoles(value) {
    //Reset selected market if any
    this.selectedUserMarkets = undefined;
    this.selectedUserRoles = value
    //If admin then assign all markets
    this.selectedUserMarkets = this.selectedUserRoles === Constant.ADMIN
      ? this.props.storeData._efCom_OrganicSearch_Markets.map(m => { return m.MarketCode }).toLocaleString()
      : this.selectedUserMarkets
    this.setState({ isVisible: this.selectedUserRoles === Constant.ADMIN ? false : true });
  }

  BindMarkets(value) {
    this.selectedUserMarkets = value;
  }

  getSelectedValue(value) {
    if (value && JSON.stringify(this.props.storeData._userDashboardData.map(m => { return m.UserName })
      .filter((x, i, a) => { return a.indexOf(x) === i })
      .map(m => { return { name: m } })).toLowerCase().includes(value.toLowerCase())) {
      this.userName = value;
      this.isValidUser = true;
      this.selectedUserRoles = this.props.storeData._userDashboardData.filter(m => m.UserName === value)[0]["RoleName"];
      this.selectedUserMarkets = this.props.storeData._userDashboardData.filter(m => m.UserName === value).map(m => m.MarketCode);
      this.setState({ isVisible: this.selectedUserRoles === Constant.ADMIN ? false : true });
    }
    else {
      this.userName = Constant.EMPTY_STRING;
      this.isValidUser = false;
    }
  }

  updateUser() {
    if (!this.selectedUserMarkets) {
      alert(Constant.ERROR_MARKET_EMPTY);
    }
    else if (this.isValidUser) {
      this.userDetails = {};
      this.userDetails.userName = this.userName;
      this.userDetails.rolesXml = '<userpermission xmlns=""> <role rolename ="' + this.selectedUserRoles + '"/> </userpermission>';
      this.userDetails.marketCodeXml = '<userpermission xmlns="">' + this.selectedUserMarkets.split(',').map(m => { return '<market marketCode="' + m + '"/>' }).toString().replace(/,/g, ' ') + '</userpermission>'
      console.log(this.userDetails);
      API.updateUser.call(this);
      this.props.getEditUserData(true);
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
                <TextBox
                  setData={this.props.storeData._userDashboardData.map(m => { return m.UserName })
                    .filter((x, i, a) => { return a.indexOf(x) === i }).map(m => { return { name: m } })}
                  getData={this.getSelectedValue.bind(this)}
                />
              </div>
            </div>

            <div className="form-group row">
              <div className="col-sm-12">
                <DropDown
                  Roles={Constant.ROLES}
                  multiSelect={true}
                  bindedRoleValue={this.BindRoles.bind(this)}
                  SetInitalValue={this.selectedUserRoles}
                />
              </div>
            </div>

            {this.state.isVisible ?
              <div className="form-group row">
                <div className="col-sm-12">
                  <DropDown
                    Markets={this.props.storeData._efCom_OrganicSearch_Markets
                      .map(m => { return { label: m.Name, value: m.MarketCode } })}
                    multiSelect={true}
                    bindedMarketValue={this.BindMarkets.bind(this)}
                    SetInitalValue={this.selectedUserMarkets}
                  />
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
export default connect((state, props) => { return { storeData: state } })(EditUser);
