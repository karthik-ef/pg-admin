import React, { Component } from 'react';
import SearchResults from '../SearchResult/SearchResults';
import CreatePages from '../CreatePages';
import AddUser from '../UserManagement/UserDashBoard';
import BulkUpload from '../BulkUpload';

class Content extends Component {
  render() {

    // Render the component based on URL
    const component = window.location.pathname === '/SearchResults' ? <SearchResults />
      : window.location.pathname === '/CreatePages' ? <CreatePages />
        : window.location.pathname === '/AddUser' ? <AddUser />
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
