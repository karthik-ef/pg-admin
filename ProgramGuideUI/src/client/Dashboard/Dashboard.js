import React, { Component } from 'react';
import './Dashboard.css';
import Header from './Header';
import Footer from './Footer';
import Content from './Content';

class Dashboard extends Component {
    render() {
        return (
            <div className="mainDiv">
               <Header/>
               <Content/>
               <Footer/>
            </div>
        );
    }
}
export default Dashboard;