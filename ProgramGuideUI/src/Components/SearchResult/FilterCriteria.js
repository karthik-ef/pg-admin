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

    getSearchByUrlValue = (values) => {
        this.props.SearchByUrlValue(values)
    }

    render() {
        let PageUrl = this.props.PageUrl
        return (

            this.props.FilterCriteria === 'Search By URL' ?
                <SearchByUrl PageUrl = {PageUrl} EnteredPageUrl = {this.getSearchByUrlValue} />
                : <SearchByTag SearchByTagValues={this.getSearchByTagValues} />
        )
    }

}

export default FilterCriteria;
