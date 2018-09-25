import React, { Component } from 'react';
import SearchResults from '../SearchResult/SearchResults';
import CreatePage from '../CreatePage';
import AddUser from '../UserManagement/UserDashBoard';
import BulkUpload from '../BulkUpload';

class Content extends Component {
  render() {
    var Role = JSON.parse(localStorage.getItem('Login'))['Roles']['RoleName'];

    if(window.location.pathname.toLowerCase() === '/' ){
      window.location.pathname = '/SearchResults';
    }
    // Render the component based on URL
    const component = window.location.pathname.toLowerCase() === '/searchresults' ? <SearchResults />
        : window.location.pathname.toLowerCase() === '/createpage' ? <CreatePage />
          : Role === 'Admin' && window.location.pathname.toLowerCase() === '/adduser' ? <AddUser />
            : window.location.pathname.toLowerCase() === '/bulkupload' ? <BulkUpload />
              : '';
    return (

      <div className="contentDiv">
        {component}
      </div>
    );
  }
}

export default Content;
