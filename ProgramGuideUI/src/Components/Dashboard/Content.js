import React, { Component } from 'react';
import SearchResults from '../SearchResult/SearchResults';
import ComparePages from '../ComparePages';
import AddUser from '../AddUser';
import BulkUpload from '../BulkUpload';

class Content extends Component {
  render() {

    const component = window.location.pathname === '/SearchResults' ? <SearchResults />
      : window.location.pathname === '/ComparePages' ? <ComparePages />
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
