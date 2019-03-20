import React, { Component } from 'react';
import SearchByTag from './SearchByTag'
import SearchByUrl from './SearchByUrl'
import * as Constant from '../../utils/constant';

class FilterCriteria extends Component {

    constructor() {
        super();
        this.objFilterCriteria = {};
    }

    //Selected tag data
    getSearchByTagValue = (value) => {
        this.objFilterCriteria.SearchByTagResult = value;
        this.props.getFilterCriteriaResult(this.objFilterCriteria);
    }

    //Selected tag data
    getSearchByUrlValue = (value) => {
        this.objFilterCriteria.SearchByUrlResult = value;
        this.props.getFilterCriteriaResult(this.objFilterCriteria);
    }

    render() {
        return (
            this.props.displayComponent === Constant.SEARCH_BY_URL //Check which component to display
                ? <SearchByUrl getSearchByUrlData={this.getSearchByUrlValue} />
                : <SearchByTag getSearchByTagData={this.getSearchByTagValue} />
        )
    }
}

export default FilterCriteria;
