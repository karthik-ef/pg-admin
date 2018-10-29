import React, { Component } from 'react';
import { Link } from "react-router-dom";
import LogoutIcon from './Logout.png';
import $ from 'jquery';
import { css } from 'react-emotion';
import { ClipLoader } from 'react-spinners';

const override = css`
margin-top: 15%;
margin-right: 15%;
margin-bottom: 15%;
margin-left: 45%;
`;
let uniqueContentMarkets, userMarkets, userName = '', role = 'General';

class Header extends Component {
    constructor() {
        super();
        this.state = {
            availableMarkets: [],
            loading: false,
            render: false,
        }
    }

    componentDidMount() {
        userName = JSON.parse(localStorage.getItem('Login'))['UserName'];
        role = JSON.parse(localStorage.getItem('Login'))['Roles']['RoleName'];
        this.getAvailableMarket();
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

    getUserMarkets() {
        $.ajax({
            url: 'http://ctdev.ef.com:3000/userMarkets/?userName=' + userName,
            type: 'GET',
            cache: false,
            success: function (data) {
                userMarkets = data;
                this.setState({ availableMarkets: userMarkets.filter(m => uniqueContentMarkets.map(m => { return m.MarketCode }).includes(m.MarketCode)) });
            }.bind(this),
            error: function (xhr, status, err) {
                console.log(err);
            }
        });
    }

    bindUserMarkets() {
        if (this.state.availableMarkets) {
            return this.state.availableMarkets.sort((a, b) => a.Name.localeCompare(b.Name))
                .map(m => { return <option key={m.MarketCode} value={m.MarketCode} selected={localStorage.getItem('Market') === m.MarketCode ? true : false}>{m.Name} </option> });
        }
    }

    onChange() {
        this.setState({ loading: true }, function () {
            this.props.opac(this.state.loading);
        });
        localStorage.setItem('Market', this.refs.SelectedMarket.value);
        if (window.location.pathname === '/SearchResults' || window.location.pathname === '/CreatePage') {
            window.location.reload();
        }
    }

    Logout() {
        window.location.pathname = '/';
        localStorage.clear();
    }


    render() {
        console.log(this.state.availableMarkets);
        return (
            <div className="headerDiv">

                <div className="test1">
                    {/* Display Brand */}
                    <div className="brandDiv">
                        <nav className="navbar navbar-light bg-light">
                            <img className="efLogo" src="//www.ef.de/sitecore/__/~/media/universal/logo/2015/black/00.svg" alt="EF Education First" />
                        </nav>
                    </div>

                    {/* Navigation Bar Menu */}
                    <div className="navItemsDiv">
                        <nav className="navbar navbar-light bg-light">
                            <select className="form-control" id="exampleFormControlSelect1" ref="SelectedMarket" onChange={this.onChange.bind(this)}>
                                {this.state.availableMarkets.length !== 1 ? <option value="select">---Choose Market---</option> : ''}
                                {this.state.availableMarkets.length === 1 ? localStorage.setItem('Market', this.state.availableMarkets.map(m => { return m.MarketCode })) : ''}
                                {this.bindUserMarkets()}
                            </select>
                        </nav>

                    </div>
                    {/* <div className="navItemsDiv">
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
                                        <select className="form-control" id="exampleFormControlSelect1" ref="SelectedMarket" onChange={this.onChange.bind(this)}>
                                            {this.state.availableMarkets.length !== 1 ? <option value="select">---Choose Market---</option> : ''}
                                            {this.state.availableMarkets.length === 1 ? localStorage.setItem('Market', this.state.availableMarkets.map(m => { return m.MarketCode })) : ''}
                                            {this.bindUserMarkets()}
                                        </select>
                                    </li>
                                </ul>
                            </div>
                        </nav>
                    </div> */}

                    {/* Display Profile Information */}
                    <div className="profileDiv">
                        <nav className="navbar navbar-light bg-light">
                            {userName}
                            <button type="button" class="btn btn-primary" onClick={this.Logout.bind(this)}>Logout</button>
                            {/* karthik.subbarayappa
                        <img src={LogoutIcon} alt="" /> */}
                        </nav>
                    </div>
                    <div>
                        <ClipLoader
                            className={override}
                            sizeUnit={"px"}
                            size={50}
                            color={'#123abc'}
                            loading={this.state.loading}
                        />
                    </div>
                </div>
                <div className="test2">
                    <strong> Program Guide 2.0 </strong>
                    <div className="navItemsDiv1">
                        <nav className="navbar navbar-expand-lg navbar-light">
                            <br />
                            <div className="collapse navbar-collapse" id="navbarSupportedContent1">
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
                                </ul>
                            </div>
                        </nav>
                    </div>
                </div>

            </div >
        );
    }
}

export default Header;
