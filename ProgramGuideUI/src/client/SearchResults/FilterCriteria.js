import React, { Component } from 'react';
import SearchByTag from './SearchByTag'
import SearchByUrl from './SearchByUrl'
import * as Constant from '../../utils/constant';
import SearchByKeyword from './SearchByKeyword';
import { connect } from 'react-redux';

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

    //Selected keyword
    getSearchByKeywordValue = (value) => {
        this.objFilterCriteria.SearchByKeywordResult = value;
        this.props.getFilterCriteriaResult(this.objFilterCriteria);
    }

    render() {
        return (
            this.props.displayComponent === Constant.SEARCH_BY_URL //Check which component to display
                ? <SearchByUrl getSearchByUrlData={this.getSearchByUrlValue} />
                : this.props.displayComponent === Constant.SEARCH_BY_TAG
                    ? <SearchByTag getSearchByTagData={this.getSearchByTagValue} ValueFromDb={this.props.storeData._filterTagCriteria} />
                    : <SearchByKeyword getSearchByKeywordData={this.getSearchByKeywordValue} />
        )
    }
}

export default connect((state, props) => { return { storeData: state } })(FilterCriteria);
