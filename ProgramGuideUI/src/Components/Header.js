import React, { Component } from 'react';
import { Link } from "react-router-dom";
import '../App.css';
import Routes from '../Routes';

class Header extends Component {

  render() {

    return (
      <div className="Nav-bar-header">
      {/* <header className="App-header">
        <div>
          <h2>Program Guide</h2>
          <h3>EF.Com Technology</h3>
        </div>
      </header> */}
        <nav class="navbar navbar-expand-lg navbar-light bg-light">
          <legend class="navbar-brand"><strong>Program Guide 2.0</strong></legend>
          <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav mr-auto">
              <li class="nav-item active">
                <Link to ="/SearchResults" class="nav-link" >Search Results <span class="sr-only">(current)</span></Link>
              </li>
              <li class="nav-item">
                <Link to ="/ComparePages" class="nav-link">Compare Pages</Link>
              </li>
              {/* <li class="nav-item dropdown">
                <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                  Dropdown
               </a>
                <div class="dropdown-menu" aria-labelledby="navbarDropdown">
                  <a class="dropdown-item" href="#">Action</a>
                  <a class="dropdown-item" href="#">Another action</a>
                  <div class="dropdown-divider"></div>
                  <a class="dropdown-item" href="#">Something else here</a>
                </div>
              </li> */}
              <li class="nav-item">
                <Link to ="/AddUser" class="nav-link">Add User</Link>
              </li>
              <li class="nav-item">
                <Link to ="/BulkUpload" class="nav-link">Bulk Upload</Link>
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
