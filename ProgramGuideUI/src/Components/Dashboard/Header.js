import React, { Component } from 'react';
import { Link } from "react-router-dom";
import LogoutIcon from './Logout.png';
import $ from 'jquery';

const UserName = '';
const Role = 'General';

class Header extends Component {
    constructor() {
        super();
        this.userMarkets = '';
        this.state = {
            userMarkets: []
        }
    }

    componentDidMount() {
        this.UserName = JSON.parse(sessionStorage.getItem('Login'))['UserName']; // 'Hao.Peng' // JSON.parse(sessionStorage.getItem('Login'))['UserName'];
        this.Role =  JSON.parse(sessionStorage.getItem('Login'))['Roles']['RoleName'] ;
        this.getUserMarkets();
    }

    getUserMarkets() {
        $.ajax({
            url: 'http://ctdev.ef.com:3000/userMarkets/?userName=' + this.UserName,
            type: 'GET',
            cache: false,
            success: function (data) {
                console.log(data);
                console.log('');
                this.setState({ userMarkets: data });
            }.bind(this),
            error: function (xhr, status, err) {
                console.log(err);
            }
        });

    }

    bindUserMarkets() {
        if (this.state.userMarkets) {
            return this.state.userMarkets.sort((a, b) => a.Name.localeCompare(b.Name)).map(m => { return <option key={m.MarketCode} value={m.MarketCode}>{m.Name}</option> });
        }
    }


    render() {
        return (
            <div className="headerDiv">

                {/* Display Brand */}
                <div className="brandDiv">
                    <nav className="navbar navbar-light bg-light">
                        <img className="efLogo" src="//www.ef.de/sitecore/__/~/media/universal/logo/2015/black/00.svg" alt="EF Education First" />
                        <strong> Program Guide 2.0 </strong>
                    </nav>
                </div>

                {/* Navigation Bar Menu */}
                <div className="navItemsDiv">
                    <nav className="navbar navbar-expand-lg navbar-light bg-light">
                        <div className="collapse navbar-collapse" id="navbarSupportedContent">
                            <ul className="navbar-nav mr-auto">
                                <li className="nav-item active">
                                    <Link to="/SearchResults" className="nav-link" >Search Results <span className="sr-only">(current)</span></Link>
                                </li>
                                <li className="nav-item">
                                    <Link to="/CreatePage" className="nav-link">Create Page</Link>
                                </li>
                                {this.Role !== 'Admin' ? '' : <li className="nav-item">
                                    <Link to="/AddUser" className="nav-link">Add User</Link>
                                </li>}
                                <li className="nav-item">
                                    <Link to="/BulkUpload" className="nav-link">Bulk Upload</Link>
                                </li>
                                <li className="nav-item">
                                    <select className="form-control" id="exampleFormControlSelect1">
                                        {this.state.userMarkets.length !== 1 ? <option value="select">---Choose Market---</option> : ''}
                                        {this.bindUserMarkets()}
                                    </select>
                                </li>
                            </ul>
                        </div>
                    </nav>
                </div>

                {/* Display Profile Information */}
                <div className="profileDiv">
                    <nav className="navbar navbar-light bg-light">
                    {this.UserName }
                        {/* karthik.subbarayappa
                        <img src={LogoutIcon} alt="" /> */}
                    </nav>
                </div>
            </div>
        );
    }
}

export default Header;
