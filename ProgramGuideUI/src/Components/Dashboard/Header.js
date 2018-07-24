import React, { Component } from 'react';
import { Link } from "react-router-dom";

class Header extends Component {
  render() {

    return (
        <div className="headerDiv">
        {/* Display Brand */}
        <div className="brandDiv">
            <img className="efLogo" src="//www.ef.de/sitecore/__/~/media/universal/logo/2015/black/00.svg" alt="EF Education First" />
        </div>
        <div className="applicationNameDiv1"><h3>Program Guide 2.0</h3></div>
        {/* Navigation Bar Menu */}
        <div className="navItemsDiv">
            <div className="emptyDiv"></div>
            <div className="navBarDiv">
                <ul id="horizontal-style">
                    <li>
                        <Link to="/SearchResults" class="nav-link" >Search Results <span class="sr-only">(current)</span></Link>
                    </li>
                    <li>
                        <Link to="/ComparePages" class="nav-link">Compare Pages</Link>
                    </li>
                    <li >
                        <Link to="/AddUser" class="nav-link">Add User</Link>
                    </li>
                    <li>
                        <Link to="/BulkUpload" class="nav-link">Bulk Upload</Link>
                    </li>
                    <li >
                        <select class="form-control" id="exampleFormControlSelect1">
                            <option value="select">---Choose---</option>
                        </select>
                    </li>
                </ul>
                {/* <Routes /> */}
            </div>
        </div>
        {/* Display Profile Information */}
        <div className="profileDiv">
            <p>User Name <span className="floatLeft"></span ></p>
        </div>
    </div>
    );
  }
}

export default Header;
