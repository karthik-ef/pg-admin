import React, { Component } from 'react';
import './App.css';
import Login from './Login';
import Dashboard from './client/Dashboard/Dashboard';

class App extends Component {

  constructor() {
    super();
    this.state = {
      isAuthenticUser: false
    }
  }

  ValidUser = (value) => {
    this.setState({ isAuthenticUser: value })
  }

  render() {
    //Check if local Session to identify if user session is active
    let userLoggedIn = localStorage.getItem('LoggedInTime') !== null ? ((Date.now() - localStorage.getItem('LoggedInTime'))) / 1000 < 1800 : false;
    //If user session is active more than 30 minutes redirect to login page
    //if (!userLoggedIn) localStorage.clear();
    return (
      <div>
        {this.state.isAuthenticUser ? <Dashboard /> : <Login Authentication={this.ValidUser.bind(this)} />}
      </div>
    );
  }
}
export default App;
