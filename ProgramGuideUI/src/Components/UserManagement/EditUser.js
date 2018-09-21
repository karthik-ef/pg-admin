import React, { Component } from 'react';
import $ from 'jquery';
import Dropdowm from '../CustomizedDropDown';
import TextBox from '../CustomTextBox';

var isVisible = true;
class EditUser extends Component {
  constructor() {
    super();
    //Declaration
    this.isVisible = true;
    this.isValue = false;
    this.MarketsList = [];
    this.state = {
        Roles: [],
        Market:[],
        InitialRolesValue:'',
        InitialMarketsValue:[],
        selectedRole: '',
        selectedUsername:'',
        UpdateUserDetails: {}
    }
}
getRoles() {
    this.setState({
        Roles: [
            {
                label: 'Admin', value: 'Admin'
            },
            {
                label: 'General', value: 'General'
            }
        ]
    });
}

getMarkets(){
    $.ajax({
        url: 'http://ctdev.ef.com:3000/market',
        dataType: 'json',
        cache: false,
        success: function (data) {
          this.MarketsList = data;
          this.setState({ Market: data.map(m => { return { label: m.Name, value: m.MarketCode } }) });
        }.bind(this),
        error: function (xhr, status, err) {
          console.log(err);
        }
      });
}
componentDidMount() {
  this.getRoles();
  this.getMarkets();
}
  BindMarkets(value) {
    this.setState({ selectedMarkets: value }); 
  }

  BindRoles(value) {
    if (value === 'Admin') {
      this.isVisible = false;
      this.setState({selectedRoles: value, selectedMarkets: this.MarketsList.map(m => { return m.MarketCode }).toLocaleString()})
    }
    else {
      this.isVisible = true;
      this.setState({ selectedRoles: value });
    }
  }

  getSelectedValue(value) {
    if(this.props.UserNamesList.filter(m => m.name === value).length <= 0 && value != '')
    { 
      alert('User does not exist');
    }
    else
    {
      this.isValue = true;
      this.setState({selectedUsername: value });
      this.setState({InitialRolesValue : this.props.UserDetailsData.filter(m => m.UserName === value)[0]["RoleName"]});
      this.setState({InitialMarketsValue: this.props.UserDetailsData.filter(m => m.UserName === value).map(m=>m.MarketCode)});
    }
  }

  handleSubmit(e) {
    if(!this.isValue)
      {
        alert(this.isValue);
          alert('User does not exist');
          window.stop();
      }
    var userDetails = {};
    userDetails.userName = this.state.selectedUsername;
    userDetails.marketCodeXml = '<userpermission xmlns="">' + this.state.selectedMarkets.split(',').map(m => { return '<market marketCode="' + m + '"/>' }).toString().replace(/,/g, ' ') + '</userpermission>'
    userDetails.rolesXml = '<userpermission xmlns=""> <role rolename ="' + this.state.selectedRoles + '"/> </userpermission>';
    this.setState({ UpdateUserDetails: userDetails }, function () {
      this.UpdateUser();
    });
    e.preventDefault();
  }

  UpdateUser() {
    console.log(this.state.saveUserDetails)
    $.ajax({
      url: 'http://ctdev.ef.com:3000/updateUser',
      type: 'POST',
      dataType: 'TEXT',
      data: this.state.UpdateUserDetails,
      cache: false,
      success: function (data) {
        window.location.reload();
        console.log(data);
        console.log('');
      }.bind(this),
      error: function (xhr, status, err) {
        console.log(err);
      }
    });

  }

    render(){
      console.log(this.state.InitialRolesValue);
      let UserNamesList = this.props.UserNamesList
        return(
          <div className="Edituser">
            <h3>Edit Users</h3>
    
            <form className="form-horizontal" onSubmit={this.handleSubmit.bind(this)}>
              <div className="form-group row">
                <div className="col-sm-12">
                  {/* <input type="text" className="form-control" id="userName" ref="userName" placeholder="User Name" required /> 
                <input type="text" className="form-control" id="userName" ref="userName" placeholder="User Name" required onBlur ={this.ValidateUser.bind(this)}/>*/}
                  <TextBox PageUrl={UserNamesList} selectedValue={this.getSelectedValue.bind(this)}/>
                </div>
              </div>
    
              <div className="form-group row">
                <div className="col-sm-12">
                  <Dropdowm Roles={this.state.Roles} multiSelect={false} bindedRoleValue={this.BindRoles.bind(this)} SetInitalValue={this.state.InitialRolesValue}/>
                  
                </div>
              </div>
          {this.isVisible ?
            <div className="form-group row">
              <div className="col-sm-12">
                <Dropdowm Markets={this.state.Market} multiSelect={true} bindedMarketValue={this.BindMarkets.bind(this)} SetInitalValue={this.state.InitialMarketsValue} />
              </div>
            </div> : ''}
    
              <div className="col-sm-12 text-center">
                <input type="submit" value="Update User" className="btn btn-primary" />
              </div>
            </form>
          </div>
        );
    }
}
export default EditUser;
