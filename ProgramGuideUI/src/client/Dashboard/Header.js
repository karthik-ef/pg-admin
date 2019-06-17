import React, { Component } from 'react';
import { Link } from "react-router-dom";
import './header.css';
import { connect } from 'react-redux';

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
        };
    }

    componentDidMount() {
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
        var selectedMarket = this.props.storeData._userMarkets.filter(m => m.Name === e.target.id).map(m => { return m.MarketCode }).toString();
        if (e.target.id) {
            this.setState({
                open: false,
                option: e.target.id
            });
        }
        this.props.dispatch({ type: 'store_SelectedMarket', data: selectedMarket });
    }

    handleToggle(e) {
        this.setState({ open: !this.state.open });
    }

    Logout() {
        window.location.pathname = '/';
        localStorage.clear();
    }

    render() {
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
                                        <span className="pg-selected-market">{option}</span>
                                    </div>
                                    {
                                        !open ? <span></span> :
                                            <div className="pg-col__options">
                                                <ul className="pg-col__item-wrapper">
                                                    {
                                                        this.props.storeData._userMarkets.map((d, i) => {
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
                                    <p className="user__name">{this.props.storeData._loginDetails.userName}</p>
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
                                    {this.props.storeData._loginDetails.roleName !== 'Admin'
                                        ? ''
                                        :
                                        <li className="nav-item">
                                            <Link to="/AddUser" className="nav-link no-padding">Add User</Link>
                                        </li>
                                    }
                                    <li className="nav-item">
                                        <Link to="/BulkUpload" className="nav-link no-padding">Bulk Upload</Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link to="/PageHierarchy" className="nav-link no-padding">Page Hierarchy</Link>
                                    </li>
                                    <li className="nav-item dropdown">
                                        <a className="nav-link dropdown-toggle no-padding" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                            Report
                                        </a>
                                        <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                                            <Link to="/TopicExperienceMapping" className="nav-link no-padding">Topic-Experience mapping</Link>
                                            {this.props.storeData._loginDetails.roleName !== 'Admin'
                                                ? ''
                                                :
                                                <div>
                                                    <div className="dropdown-divider"></div>
                                                    <Link to="/SitemapGenerator" className="nav-link no-padding">Sitemap Generator</Link>
                                                </div>
                                            }
                                            <div className="dropdown-divider"></div>
                                            <Link to="/ExportPgData" className="nav-link no-padding">Export Pg Data</Link>
                                            <Link to="/AgeGroup" className="nav-link no-padding">Age Group Report</Link>
                                            <Link to="/SitemapUniversalExperience" className="nav-link no-padding">Sitemap Universal Experience </Link>
                                            <Link to="/SitemapUniversalAgeGroup" className="nav-link no-padding">Sitemap Universal AgeGroup </Link>
                                        </div>
                                    </li>
                                    {this.props.storeData._loginDetails.userName === 'karthik.subbarayappa' ||
                                        this.props.storeData._loginDetails.userName === 'hao.peng' ||
                                        this.props.storeData._loginDetails.userName === 'ruobing.ai'
                                        ?
                                        < li className="nav-item">
                                            <Link to="/Publish" className="nav-link no-padding">Publish</Link>
                                        </li>
                                        : ''
                                    }
                                </ul>
                            </div>
                        </nav>
                    </div>
                </div>
            </div >
        );
    }
}

export default connect((state, props) => { return { storeData: state } })(Header);
