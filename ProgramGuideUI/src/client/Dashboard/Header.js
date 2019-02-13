import React, { Component } from 'react';
import { Link } from "react-router-dom";
import './header.css';
import * as API from '../../api/Markets';

class Header extends Component {

    constructor() {
        super();
        this.setWrapperRef = this.setWrapperRef.bind(this);
        this.handleToggle = this.handleToggle.bind(this);
        this.handleClickOutside = this.handleClickOutside.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.state = {
            open: false,
            option: 'Choose a market',
            availableMarkets: []
        };
    }

    componentDidMount() {
        this.userName = JSON.parse(localStorage.getItem('UserName'));
        API.getUserMarkets.call(this);
        document.addEventListener('mousedown', this.handleClickOutside);
    }

    componentWillUnmount() {
        document.removeEventListener('mousedown', this.handleClickOutside);
    }

    setWrapperRef(node) {
        this.wrapperRef = node;
    }

    handleClickOutside(e) {
        // Close the filter dropdown when clicking outside
        if (this.wrapperRef && !this.wrapperRef.contains(e.target)) {
            this.setState({ open: false });
        }
    }

    handleChange(e) {
        console.log(e.target.id);
        var selectedMarket = this.state.availableMarkets.filter(m => m.Name === e.target.id).map(m => { return m.MarketCode }).toString();
        localStorage.setItem('Market', selectedMarket);
        if (e.target.id) {
            // this.props.changeFilter(e.target.id);
            this.setState({
                open: false,
                option: e.target.id
            });
        }
        if (window.location.pathname === '/SearchResults' || window.location.pathname === '/CreatePage' || window.location.pathname === '/AddUser' || window.location.pathname === '/BulkUpload' || window.location.pathname === '/PageHierarchy') {
            window.location.reload();
        }
    }

    handleToggle(e) {
        this.setState({ open: !this.state.open });
    }

    Logout() {
        window.location.pathname = '/';
        localStorage.clear();
    }

    render() {
        console.log(this.state.availableMarkets);
        console.log(!localStorage.getItem('Market'));
        const { data } = this.props;
        const { open, option } = this.state;
        return (
            <div className="headerDiv">
                <div className="container">
                    <div className="level1">
                        {/* Display Brand */}
                        <div className="brandDiv">
                            <nav className="navbar navbar-light">
                                <img className="efLogo" src="//www.ef.de/sitecore/__/~/media/universal/logo/2015/black/00.svg" alt="EF Education First" />
                            </nav>
                        </div>
                        <div className="top-nav--items">
                            {/* Navigation Bar Menu */}
                            <div ref={this.setWrapperRef} className="navItemsDiv">
                                {/* restyle select */}
                                <div className="dropdown-menu__wrapper ">
                                    <div className={`pg-col__dropdown ${open ? '--expanded' : ''}`} onClick={this.handleToggle}>
                                        <span className="pg-selected-market">{!localStorage.getItem('Market') ? option :
                                            this.state.availableMarkets.filter(m => m.MarketCode === localStorage.getItem('Market'))
                                                .map(m => { return m.Name }).toString()}</span>
                                    </div>
                                    {
                                        !open ? <span></span> :
                                            <div className="pg-col__options">
                                                <ul className="pg-col__item-wrapper">
                                                    {
                                                        this.state.availableMarkets.map((d, i) => {
                                                            return (
                                                                <li
                                                                    id={d.Name}
                                                                    className="pg-col__item"
                                                                    onClick={this.handleChange}
                                                                    key={i}
                                                                    index={i}>
                                                                    {d.Name}
                                                                </li>
                                                            )
                                                        })
                                                    }
                                                </ul>
                                            </div>
                                    }
                                </div>
                            </div>

                            {/* Display Profile Information */}
                            <div className="profileDiv">
                                <nav className="navbar navbar-light">
                                    <p className="user__name">{this.userName}</p>
                                    <button type="button" className="btn btn-black" onClick={this.Logout.bind(this)}>Logout</button>
                                </nav>
                            </div>
                        </div>
                    </div>


                    <div className="level2">
                        <h2 className="site--title">Program Guide 2.0</h2>
                        <nav className="navbar navbar-expand-lg navbar-light nav__padding">
                            <br />
                            <div className="collapse navbar-collapse" id="navbarSupportedContent1">
                                <ul className="navbar-nav mr-auto">
                                    <li className="nav-item active">
                                        <Link to="/SearchResults" className="nav-link no-padding" >Search Results <span className="sr-only">(current)</span></Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link to="/CreatePage" className="nav-link no-padding">Create Page</Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link to="/AddUser" className="nav-link no-padding">Add User</Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link to="/BulkUpload" className="nav-link no-padding">Bulk Upload</Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link to="/PageHierarchy" className="nav-link no-padding">Page Hierarchy</Link>
                                    </li>
                                    <li class="nav-item dropdown">
                                        <a class="nav-link dropdown-toggle no-padding" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                            Report
                                        </a>
                                        <div class="dropdown-menu" aria-labelledby="navbarDropdown">
                                        <Link to="/TopicExperienceMapping" className="nav-link no-padding">Topic-Experience mapping</Link>
                                        <div class="dropdown-divider"></div>
                                        <Link to="/SitemapGenerator" className="nav-link no-padding">Sitemap Generator</Link>
                                        </div>
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
