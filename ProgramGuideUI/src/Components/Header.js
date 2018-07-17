import React, { Component } from 'react';
import { Link } from "react-router-dom";
import '../App.css';
import Routes from '../Routes';
import Dropdown from './CustomizedDropDown';
import $ from 'jquery';

class Header extends Component {
  constructor() {
    super();
    this.state = {
      userMarkets: []
    }
  }

  componentDidMount() {
    this.getUserMarkets();
  }
  
  getUserMarkets() {
    $.ajax({
      url: 'http://ctdev.ef.com:3001/userMarkets/?userName=Hao.peng',
      type:'GET',
      cache: false,
      success: function (data) {
        console.log(data);
          console.log('');
          this.setState({userMarkets: data});
      }.bind(this),
      error: function (xhr, status, err) {
        console.log(err);
      }
    });

  }

  bindUserMarkets(){
    if(this.state.userMarkets){
     return this.state.userMarkets.map(m=>{return <option key= {m.MarketCode} value={m.MarketCode}>{m.Name}</option>})
    }
  }



  render() {

    return (
      <div className="Nav-bar-header">
        <nav class="navbar navbar-expand-lg navbar-light bg-light">
          <legend class="navbar-brand"><strong>Program Guide 2.0</strong></legend>
          <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav mr-auto">
              <li class="nav-item active">
                <Link to="/SearchResults" class="nav-link" >Search Results <span class="sr-only">(current)</span></Link>
              </li>
              <li class="nav-item">
                <Link to="/ComparePages" class="nav-link">Compare Pages</Link>
              </li>
              <li class="nav-item">
                <Link to="/AddUser" class="nav-link">Add User</Link>
              </li>
              <li class="nav-item">
                <Link to="/BulkUpload" class="nav-link">Bulk Upload</Link>
              </li>
              <li className="nav-item">
                <select class="form-control" id="exampleFormControlSelect1">
                <option value="select">---Choose---</option>
                  {this.bindUserMarkets()}
                </select>
              </li>
            </ul>
            <form class="form-inline my-2 my-lg-0">
              <button class="btn btn-outline-success my-2 my-sm-0" type="submit">Logout</button>
            </form>
          </div>
        </nav>
        <Routes />
      </div>
    );
  }
}
export default Header;
