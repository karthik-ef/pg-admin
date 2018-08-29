import React, { Component } from 'react';
import SearchResults from '../SearchResult/SearchResults';
import CreatePage from '../CreatePage';
import AddUser from '../UserManagement/UserDashBoard';
import BulkUpload from '../BulkUpload';

class Content extends Component {
  render() {
    var Role = JSON.parse(localStorage.getItem('Login'))['Roles']['RoleName'];
    // Render the component based on URL
    const component = window.location.pathname === '/SearchResults' ? <SearchResults />
      : window.location.pathname === '/CreatePage' ? <CreatePage />
        : Role === 'Admin' && window.location.pathname === '/AddUser' ? <AddUser /> 
          : window.location.pathname === '/BulkUpload' ? <BulkUpload />
            : '';
    return (

      <div className="contentDiv">
        {component}
      </div>
    );
  }
}

export default Content;
