import React, { Component } from 'react';
import Dropdowm from './CustomizedDropDown';
import $ from 'jquery';

class AddUser extends Component {
  constructor() {
    super();
    this.state = {
      roles: [],
      markets: []
    }
  }

  getMarket() {
    $.ajax({
      url: 'http://10.57.41.36:3001/market',
      dataType: 'json',
      cache: false,
      success: function (data) {
        this.setState({ markets: data.map(m => { return { label: m.Name, value: m.MarketCode } }) }, function () {
          console.log(this.state);
          //this.setState({market:this.state})
          //console.log(this.state);
        });

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

  render() {
    return (
      <div className="container">
        <h3>Add Users</h3>

        <form className="form-horizontal" >
          <div className="form-group row">
            <div className="col-sm-12">
              <input type="text" className="form-control" id="userName" ref="userName" placeholder="User Name" required />
            </div>
          </div>

          <div className="form-group row">
            <div className="col-sm-12">
            <Dropdowm Roles={this.state.roles} multiSelect={true} />
            </div>
          </div>

          <div className="form-group row">
            <div className="col-sm-12">
            <Dropdowm Markets={this.state.markets} multiSelect={true} />
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
