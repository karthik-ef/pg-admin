import React, { Component } from 'react';
import { Link } from "react-router-dom";
import LogoutIcon from './Logout.png';

class Header extends Component {
    render() {

        return (
            <div className="headerDiv">
                {/* Display Brand */}
                <div className="brandDiv">
                    <nav class="navbar navbar-light bg-light">
                        <img className="efLogo" src="//www.ef.de/sitecore/__/~/media/universal/logo/2015/black/00.svg" alt="EF Education First" />
                        <strong> Program Guide 2.0 </strong>
                    </nav>
                </div>
                {/* <div className="applicationNameDiv1"><h3>Program Guide 2.0</h3></div> */}
                {/* Navigation Bar Menu */}
                <div className="navItemsDiv">
                    {/* <div className="emptyDiv"></div> */}
                    <nav class="navbar navbar-expand-lg navbar-light bg-light">
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
                                    </select>
                                </li>
                            </ul>
                        </div>
                    </nav>
                    {/* <Routes /> */}
                </div>
                {/* Display Profile Information */}
                <div className="profileDiv">
                <nav class="navbar navbar-light bg-light">
                karthik.subbarayappa
                    {/* <p>User Name <span className="floatLeft"></span ></p>
                    <img src={LogoutIcon} alt="Logo" /> */}
                        <img src={LogoutIcon}  alt=""/>
                    </nav>
                </div>
                </div>
                );
            }
        }
        
        export default Header;
