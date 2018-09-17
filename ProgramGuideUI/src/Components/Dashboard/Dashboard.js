import React, { Component } from 'react';
import './Dashboard.css';
import Header from './Header';
import Footer from './Footer';
import Content from './Content';

class Dashboard extends Component {
    constructor() {
        super();
        this.state = {
            loading: false,
        }
    }

    Method = (value) => {
        this.setState({ loading: value });
    } 
    render() {
        return (
        <div>
            {this.state.loading ?
            <div className="mainDiv opp">
                <Header opac = {this.Method.bind(this)}/>
                <Content />
                <Footer />
            </div> :
            <div className="mainDiv">
                <Header opac = {this.Method.bind(this)}/>
                <Content />
                <Footer />
            </div>}
        </div>
        );
    }
}
export default Dashboard;