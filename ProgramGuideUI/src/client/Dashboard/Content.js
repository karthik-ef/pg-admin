import React from 'react';
import Component from '../../Routes';
import * as Path from '../../utils/routepath';

class Content extends React.Component {
  render() {
    window.location.pathname.toLowerCase() === Path.Default ? window.history.pushState({}, '', Path.SearchResults) : '';
    return (
      <div className="contentDiv">
        <Component />
      </div>
    );
  }
}

export default Content;
