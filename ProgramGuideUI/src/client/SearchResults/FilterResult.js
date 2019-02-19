import React, { Component } from 'react';
import $ from 'jquery';
import FilterCriteria from './FilterCriteria';

import * as Constant from '../../utils/constant';

import './FilterResult.css';

class FilterResult extends Component {

    constructor() {
        super();
        this.state = {
            searchComponentToDisplay: Constant.SEARCH_BY_URL
        }
    }

    //Code Refactoring

    componentDidMount() {
        $('#exampleModalLong').modal('show');
        $('#defaultInline1').attr('checked', true);
    }

    searchComponentChange(event) {
        this.setState({ searchComponentToDisplay: event.target.value })
    }

    modalClose() {
        $('#exampleModalLong').modal('hide');
        this.props.getFilterResultData(Constant.EMPTY_STRING);
    }

    applyFilter() {
        if (this.filterResultsData) {
            $('#exampleModalLong').modal('hide');
            this.filterResultsData.IsActivePage = this.isActivePage;
            this.props.getFilterResultData(this.filterResultsData);
        }
    }

    inActivePageChange() {
        this.isActivePage = $('#inActive').is(':checked');
    }

    //Pass value back to parent
    filterCriteriaResult = (value) => {
        this.filterResultsData = value;
        console.log(value);
    }

    //

    render() {
        return (
            <div className="modal fade" id="exampleModalLong" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLongTitle" aria-hidden="true" data-backdrop="static" data-keyboard="false">
                <div className="modal-dialog modal-lg filter__modal" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <br />
                            <div className="filter__controls">
                                <div className="custom-control custom-radio custom-control-inline">
                                    <input type="radio" className="custom-control-input" id="defaultInline1" name="inlineDefaultRadiosExample" value={Constant.SEARCH_BY_URL} onChange={this.searchComponentChange.bind(this)} />
                                    <label className="custom-control-label" for="defaultInline1">{window.location.pathname.toLowerCase() === '/exportpgdata' ? 'Export By URL' :Constant.SEARCH_BY_URL}</label>
                                </div>

                                <div className="custom-control custom-radio custom-control-inline">
                                    <input type="radio" className="custom-control-input" id="defaultInline2" name="inlineDefaultRadiosExample" value={Constant.SEARCH_BY_TAG} onChange={this.searchComponentChange.bind(this)} />
                                    <label className="custom-control-label" for="defaultInline2">{window.location.pathname.toLowerCase() === '/exportpgdata' ? 'Export By Tag' :Constant.SEARCH_BY_URL}</label>
                                </div>
                                {window.location.pathname.toLowerCase() === '/exportpgdata' ? '' :
                                    <div className="custom-control custom-checkbox">
                                        <input type="checkbox" className="custom-control-input" id="inActive" name="inlineDefaultRadiosExample" onChange={this.inActivePageChange.bind(this)} />
                                        <label className="custom-control-label" for="inActive">{Constant.INCLUDE_INACTIVE_PAGES}</label>
                                    </div>
                                }
                            </div>

                        </div>
                        <div className="modal__btn-close">
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={this.modalClose.bind(this)}>
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <FilterCriteria setData={this.props.setData} displayComponent={this.state.searchComponentToDisplay} getFilterCriteriaResult={this.filterCriteriaResult.bind(this)} />
                        </div>

                        <div className="modal-footer">
                            <button type="button" id="Search" className="btn btn-primary btn-modal" onClick={this.applyFilter.bind(this)}>{window.location.pathname.toLowerCase() === '/exportpgdata' ? 'Finish' : 'Search'}</button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default FilterResult;
