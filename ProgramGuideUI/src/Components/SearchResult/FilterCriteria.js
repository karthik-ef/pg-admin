import React, { Component } from 'react';
import SearchByTag from './SearchByTag'
import SearchByUrl from './SearchByUrl'

class FilterCriteria extends Component {

    constructor() {
        super();
    }

    getSearchByTagValues = (values) => {
        this.props.SearchByTagValues(values)
    }

    render() {
        return (

            this.props.FilterCriteria === 'Search By URL' ?
                <SearchByUrl />
                : <SearchByTag SearchByTagValues={this.getSearchByTagValues} />
        )
    }

}

export default FilterCriteria;
