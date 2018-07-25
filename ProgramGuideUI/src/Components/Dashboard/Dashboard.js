import React, { Component } from 'react';
import './Dashboard.css';
import { Link } from "react-router-dom";
import { Route, Switch } from "react-router-dom";
import Header from './Header';
import Footer from './Footer';
import Content from './Content';


class Dashboard extends Component {

    
    render() {

        return (
            <div className="mainDiv">

                <Header />

                {/* Display Application Name */}
                {/* <div className="applicationNameDiv">Program Guide 2.0<br />Ef Techno</div> */}
                {/* Display Content */}
               <Content/>
                {/* Display Footer */}
               <Footer/>
            </div>
        );
    }
}

export default Dashboard;