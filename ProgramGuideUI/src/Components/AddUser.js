import React, { Component } from 'react';
import Dropdowm from './CustomizedDropDown';
import $ from 'jquery';

class AddUser extends Component {
  constructor() {
    super();
    this.state = {
      roles: [],
      markets: [],
      selectedMarkets: '',
      selectedRoles: '',
      saveUserDetails: {}
    }
  }

  getMarket() {
    $.ajax({
      url: 'http://ctdev.ef.com:3001/market',
      dataType: 'json',
      cache: false,
      success: function (data) {
        this.setState({ markets: data.map(m => { return { label: m.Name, value: m.MarketCode } }) });
      }.bind(this),
      error: function (xhr, status, err) {
        console.log(err);
      }
    });

  }

//POST request to register user to PG-admin
  registerUser() {
    $.ajax({
      url: 'http://localhost:3001/register',
      type:'POST',
      dataType: 'TEXT',
      data: this.state.saveUserDetails,
      cache: false,
      success: function (data) {
        console.log(data);
          console.log('');
      }.bind(this),
      error: function (xhr, status, err) {
        console.log(err);
      }
    });

  }

  getRoles() {
    this.setState({
      roles: [
        { label: 'Admin', value: 'Admin' },
        { label: 'General', value: 'General' }
      ]
    });
  }

  componentDidMount() {
    this.getRoles();
    this.getMarket();
  }

  getMarket1(value) {
    this.setState({ selectedMarkets: value });
  }

  getRoles1(value) {
    this.setState({ selectedRoles: value });
  }


  handleSubmit(e) {

    var userDetails = {};
    userDetails.userName = this.refs.userName.value;
    userDetails.marketCodeXml = '<userpermission xmlns="">' + this.state.selectedMarkets.split(',').map(m => {return '<market marketCode="' + m + '"/>' }).toString().replace(/,/g,' ') + '</userpermission>'
    userDetails.rolesXml = '<userpermission xmlns=""> <role rolename ="' +this.state.selectedRoles +'"/> </userpermission>';


    this.setState({saveUserDetails:userDetails},function(){
      this.registerUser();
    });

    e.preventDefault();
   
  }

  render() {
    return (
      <div className="container">
        <h3>Add Users</h3>

        <form className="form-horizontal" onSubmit={this.handleSubmit.bind(this)}>
          <div className="form-group row">
            <div className="col-sm-12">
              <input type="text" className="form-control" id="userName" ref="userName" placeholder="User Name" required />
            </div>
          </div>

          <div className="form-group row">
            <div className="col-sm-12">
              <Dropdowm Roles={this.state.roles} multiSelect={true} bindedRoleValue={this.getRoles1.bind(this)} />
            </div>
          </div>

          <div className="form-group row">
            <div className="col-sm-12">
              <Dropdowm Markets={this.state.markets} multiSelect={true} bindedMarketValue={this.getMarket1.bind(this)} />
            </div>
          </div>

          <div className="col-sm-12 text-center">
            <input type="submit" value="Register" className="btn btn-primary" />
          </div>
        </form>
      </div>
    );
  }
}

export default AddUser;
