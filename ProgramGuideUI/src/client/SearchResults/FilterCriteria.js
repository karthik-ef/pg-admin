import React, { Component } from 'react';
import SearchByTag from './SearchByTag'
import SearchByUrl from './SearchByUrl'

import * as Constant from '../../utils/constant';

class FilterCriteria extends Component {

    constructor() {
        super();
        this.objFilterCriteria = {};
    }

    getSearchByTagValue = (value) => {
        this.objFilterCriteria.SearchByTagResult = value;
        this.props.getFilterCriteriaResult(this.objFilterCriteria);
    }

    getSearchByUrlValue = (value) => {
        this.objFilterCriteria.SearchByUrlResult = value;
        this.props.getFilterCriteriaResult(this.objFilterCriteria);
    }

    render() {
        console.log(this);
        return (
            this.props.displayComponent === Constant.SEARCH_BY_URL ?
                <SearchByUrl setPageUrlData={this.props.setData['PageUrls']} getSearchByUrlData={this.getSearchByUrlValue} />
                : <SearchByTag getSearchByTagData={this.getSearchByTagValue} />
        )
    }

}

export default FilterCriteria;
