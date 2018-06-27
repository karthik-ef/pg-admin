import React, { Component } from 'react';
import '../App.css';

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
                <a class="nav-link" href="#">Search Results <span class="sr-only">(current)</span></a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="#">Compare Pages</a>
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
                <a class="nav-link" href="#">Add User</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="#">Bulk Upload</a>
              </li>
            </ul>
            <form class="form-inline my-2 my-lg-0">
              <button class="btn btn-outline-success my-2 my-sm-0" type="submit">Logout</button>
            </form>
          </div>
        </nav>
      </div>
    );
  }
}
export default Header;
