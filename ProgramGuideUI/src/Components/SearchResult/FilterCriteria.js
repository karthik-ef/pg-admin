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
        let PageUrl = this.props.PageUrl
        return (

            this.props.FilterCriteria === 'Search By URL' ?
                <SearchByUrl PageUrl = {PageUrl} />
                : <SearchByTag SearchByTagValues={this.getSearchByTagValues} />
        )
    }

}

export default FilterCriteria;
