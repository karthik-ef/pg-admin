import React, { Component } from 'react';
import $ from 'jquery';
import SearchByTag from './SearchResult/SearchByTag';
import AddUser from "./AddUser";

class SearchResults extends Component {

  render() {

    return (
      <div className="container">
      <SearchByTag/>
      </div>
    );
  }
}

export default SearchResults;
