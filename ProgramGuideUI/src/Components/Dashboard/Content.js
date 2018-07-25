import React, { Component } from 'react';
import SearchResults from '../SearchResult/SearchResults';

class Content extends Component {
  render() {

    return (
        <div className="contentDiv">
       <SearchResults/>
    </div>
    );
  }
}

export default Content;
