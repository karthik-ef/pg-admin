import React, { Component } from 'react';
import $ from 'jquery';
import './App.css';
import Login from './Components/Login';
import Main from './Components/Dashboard/Dashboard';

let sessio;

class App extends Component {

  reload() {
    //this.setState({flag: true})
    this.forceUpdate();
  }

  render() {
    //Check if local Session to identify if user session is active
    let userLoggedIn = localStorage.getItem('LoggedInTime') !== null ? ((Date.now() - localStorage.getItem('LoggedInTime'))) / 1000 < 1800 : false;
    //If user session is active more than 30 minutes redirect to login page
    if (!userLoggedIn)  localStorage.clear();


    return (
      <div >
        {/* <Login loginDetails={this.handleReq.bind(this)} /> */}
        {userLoggedIn ? <Main /> : <Login Refresh = {this.reload.bind(this)}/>}
        {/* {this.state.flag ? <Main /> : <Login loginDetails={this.handleReq.bind(this)} />} */}
        {/* <Main/> */}
      </div>
    );
  }
}

export default App;
