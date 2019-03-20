import React, { Component } from 'react';

import DropDown from '../CustomControls/DropDown';
import $ from 'jquery';
import * as API from '../../api/UserManagement';
import * as Constant from '../../utils/constant';

import { connect } from 'react-redux';

class AddUser extends Component {

  constructor() {
    super();
    this.state = { isVisible: true }
  }

  BindRoles(value) {
    //Reset selected market if any
    this.selectedMarkets = undefined;
    this.selectedRole = value
    //If admin then assign all markets
    this.selectedMarkets = this.selectedRole === Constant.ADMIN
      ? this.props.storeData._efCom_OrganicSearch_Markets.map(m => { return m.MarketCode }).toLocaleString()
      : this.selectedMarkets
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
    else if (JSON.stringify(
      this.props.storeData._userDashboardData.map(m => { return m.UserName })
        .filter((x, i, a) => { return a.indexOf(x) === i }).map(m => { return { name: m } })
    ).toLowerCase().includes(this.refs.userName.value)) {
      alert(Constant.ERROR_USER_EXIST);
    }
    else {
      this.userDetails = {};
      this.userDetails.userName = this.refs.userName.value;
      this.userDetails.marketCodeXml = '<userpermission xmlns="">' + this.selectedMarkets.split(',').map(m => { return '<market marketCode="' + m + '"/>' }).toString().replace(/,/g, ' ') + '</userpermission>';
      this.userDetails.rolesXml = '<userpermission xmlns=""> <role rolename ="' + this.selectedRole + '"/> </userpermission>';
      API.registerUser.call(this);
      this.props.getAddUserData(true);
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
                <DropDown
                  Roles={Constant.ROLES}
                  multiSelect={true}
                  bindedRoleValue={this.BindRoles.bind(this)}
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
                  />
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
export default connect((state, props) => { return { storeData: state } })(AddUser);
