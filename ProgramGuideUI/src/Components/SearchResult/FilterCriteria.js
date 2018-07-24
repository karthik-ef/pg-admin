import React, { Component } from 'react';
import SearchByTag from './SearchByTag'
import SearchByUrl from './SearchByUrl'

class FilterCriteria extends Component {

    render() {

        if (this.props.FilterCriteria === 'Search By URL') {
            return <SearchByUrl />
        }
        else {
            return <SearchByTag />
        }

    }
}

export default FilterCriteria;
