import React, { Component } from 'react';
import { Link } from "react-router-dom";
import LogoutIcon from './Logout.png';
import $ from 'jquery';

let uniqueContentMarkets, userMarkets, userName = '', role = 'General';

class Header extends Component {
    constructor() {
        super();
        this.state = {
            availableMarkets: [],
        }
    }

    componentDidMount() {
        userName = JSON.parse(sessionStorage.getItem('Login'))['UserName']; // 'Hao.Peng' // JSON.parse(sessionStorage.getItem('Login'))['UserName'];
        role = JSON.parse(sessionStorage.getItem('Login'))['Roles']['RoleName'];
        this.getAvailableMarket();
    }

    getUserMarkets() {
        $.ajax({
            url: 'http://ctdev.ef.com:3000/userMarkets/?userName=' + userName ,
            type: 'GET',
            cache: false,
            success: function (data) {
                userMarkets = data;
                this.setState({availableMarkets: userMarkets.filter(m => uniqueContentMarkets.map(m => {return m.MarketCode}).includes(m.MarketCode))});
            }.bind(this),
            error: function (xhr, status, err) {
                console.log(err);
            }
        });
    }

    getAvailableMarket() {
        $.ajax({
            url: 'http://ctdev.ef.com:3000/getUniqueContentMarkets',
            type: 'GET',
            cache: false,
            success: function (data) {
                uniqueContentMarkets = data;
                this.getUserMarkets();
            }.bind(this),
            error: function (xhr, status, err) {
                console.log(err);
            }
        });
    }

    bindUserMarkets() {
        if (this.state.availableMarkets) {
            return this.state.availableMarkets.sort((a, b) => a.Name.localeCompare(b.Name)).map(m => { return <option key={m.MarketCode} value={m.MarketCode}>{m.Name}</option> });
        }
    }

    onChange(){
        sessionStorage.setItem('Market', this.refs.SelectedMarket.value);
        if (window.location.pathname === '/SearchResults'){
            //window.location.reload();
            // this.props.Pass('a');
        }
    }


    render() {
        console.log(this.state.availableMarkets);
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
                                {role !== 'Admin' ? '' : <li className="nav-item">
                                    <Link to="/AddUser" className="nav-link">Add User</Link>
                                </li>}
                                <li className="nav-item">
                                    <Link to="/BulkUpload" className="nav-link">Bulk Upload</Link>
                                </li>
                                <li className="nav-item">
                                    <select className="form-control" id="exampleFormControlSelect1" ref="SelectedMarket" onChange= {this.onChange.bind(this)}>
                                        {this.state.availableMarkets.length !== 1 ? <option value="select">---Choose Market---</option> : ''}
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
                        {userName}
                        {/* karthik.subbarayappa
                        <img src={LogoutIcon} alt="" /> */}
                    </nav>
                </div>
            </div>
        );
    }
}

export default Header;
