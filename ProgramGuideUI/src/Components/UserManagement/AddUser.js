import React, { Component } from 'react';
import Dropdowm from '../CustomizedDropDown';
import $ from 'jquery';

var isVisible = true;
const MarketsList = [];

class AddUser extends Component {
  constructor() {
    super();
    this.isVisible = true;
    this.MarketsList = [];
    this.state = {
      roles: [],
      markets: [],
      selectedMarkets: '',
      selectedRoles: '',
      saveUserDetails: {}
    }
  }

  getMarkets() {
    $.ajax({
      url: 'http://ctdev.ef.com:3000/market',
      dataType: 'json',
      cache: false,
      success: function (data) {
        this.MarketsList = data;
        this.setState({ markets: data.map(m => { return { label: m.Name, value: m.MarketCode } }) });
      }.bind(this),
      error: function (xhr, status, err) {
        console.log(err);
      }
    });

  }

  //POST request to register user to PG-admin
  registerUser() {
    console.log(this.state.saveUserDetails)
    $.ajax({
      url: 'http://ctdev.ef.com:3000/registerUser',
      type: 'POST',
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
    this.getMarkets();
  }

  BindMarkets(value) {
    console.log(value)
    this.setState({ selectedMarkets: value });
  }

  BindRoles(value) {
    console.log(value)
    if (value === 'Admin') {
      this.isVisible = false;
      this.setState({selectedRoles: value, selectedMarkets: this.MarketsList.map(m => { return m.MarketCode }).toLocaleString()})
    }
    else {
      this.isVisible = true;
      this.setState({ selectedRoles: value });
    }
  }

  ValidateUser(e)
  {
    if(this.props.UserNamesList.filter(m => m.name === this.refs.userName.value).length > 0)
    { 
      alert('User already exist');
      this.refs.userName.value = '';
    } 
  }

  handleSubmit(e) {

    var userDetails = {};
    userDetails.userName = this.refs.userName.value;
    userDetails.marketCodeXml = '<userpermission xmlns="">' + this.state.selectedMarkets.split(',').map(m => { return '<market marketCode="' + m + '"/>' }).toString().replace(/,/g, ' ') + '</userpermission>'
    userDetails.rolesXml = '<userpermission xmlns=""> <role rolename ="' + this.state.selectedRoles + '"/> </userpermission>';


    this.setState({ saveUserDetails: userDetails }, function () {
      this.registerUser();
    });
    e.preventDefault();
  }

      render() {
        let UserNamesList = this.props.UserNamesList;
        console.log(UserNamesList);
        return (
          <div className="Adduser">
            <h3>Add Users</h3>
    
            <form className="form-horizontal" onSubmit={this.handleSubmit.bind(this)}>
          <div className="form-group row">
            <div className="col-sm-12">
              <input type="text" className="form-control" id="userName" ref="userName" placeholder="User Name" required onBlur ={this.ValidateUser.bind(this)}/>
            </div>
          </div>

          <div className="form-group row">
            <div className="col-sm-12">
              <Dropdowm Roles={this.state.roles} multiSelect={true} bindedRoleValue={this.BindRoles.bind(this)} />
            </div>
          </div>

          {this.isVisible ?
            <div className="form-group row">
              <div className="col-sm-12">
                <Dropdowm Markets={this.state.markets} multiSelect={true} bindedMarketValue={this.BindMarkets.bind(this)} />
              </div>
            </div> : ''}

          <div className="col-sm-12 text-center">
            <input type="submit" value="Register" className="btn btn-primary" />
          </div>
        </form>
          </div>
        );
      }
    }
export default AddUser;
