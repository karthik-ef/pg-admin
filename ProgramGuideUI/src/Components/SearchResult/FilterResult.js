import React, { Component } from 'react';
import $ from 'jquery';
import FilterCriteria from './FilterCriteria';


class FilterResult extends Component {

    constructor() {
        super();

        this.state = {
            selectedValue: 'Search By URL',
            isClosed: false,
            selectedTagValue: [],
            isSearched: false,
            selectedUrlValue1: ''
        };
        this.handleClick = this.handleClick.bind(this);
        this.handleCloseClick = this.handleCloseClick.bind(this);
        this.handleSearchClick = this.handleSearchClick.bind(this);
    }

    componentDidMount() {
        $('#exampleModalLong').modal('show');
        $('#defaultInline1').attr('checked', true);
    }

    handleClick(event) {
        this.setState({
            selectedValue: event.target.value
        });
    }

    handleCloseClick() {
        this.setState({ isClosed: true });
    }

    getSearchByTagValues = (values) => {
        this.setState({ selectedTagValue: values })
    }

    getSearchByUrlValue = (values) => {
        //console.log(values)

        this.setState({ selectedUrlValue1: values })
    }

    handleSearchClick() {
        $('#exampleModalLong').modal('hide');
        this.setState({ isClosed: true });
        this.setState({ isSearched: true })
    }

    onChange() {
        this.props.IncludeInactivePage($('#inActive').is(':checked'));
    }


    render() {
        let selectedTagOption = this.state.selectedValue === 'Search By URL' ? this.state.selectedUrlValue1 : this.state.selectedTagValue
        let dyna = [this.state.isClosed, selectedTagOption]
        let PageUrl = this.props.PageUrl
        this.state.isClosed && this.state.isSearched ? this.props.callbackFromParent(dyna) : this.props.callbackFromParent(this.state.isClosed);
        return (
            <div className="modal fade" id="exampleModalLong" tabindex="-1" role="dialog" aria-labelledby="exampleModalLongTitle" aria-hidden="true" data-backdrop="static" data-keyboard="false">
                <div className="modal-dialog modal-lg" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <br />
                            <div className="custom-control custom-radio custom-control-inline">
                                <input type="radio" className="custom-control-input" id="defaultInline1" name="inlineDefaultRadiosExample" value="Search By URL" onChange={this.handleClick} />
                                <label class="custom-control-label" for="defaultInline1">Search By URL</label>
                            </div>

                            <div class="custom-control custom-radio custom-control-inline">
                                <input type="radio" className="custom-control-input" id="defaultInline2" name="inlineDefaultRadiosExample" value="Search By Tag" onChange={this.handleClick} />
                                <label className="custom-control-label" for="defaultInline2">Search By Tag</label>
                            </div>

                            <div className="custom-control custom-checkbox">
                                <input type="checkbox" className="custom-control-input" id="inActive" name="inlineDefaultRadiosExample" onChange = {this.onChange.bind(this)}/>
                                <label class="custom-control-label" for="inActive">Include inactive pages</label>
                            </div>

                            <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={this.handleCloseClick}>
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div class="modal-body">
                            <FilterCriteria FilterCriteria={this.state.selectedValue} SearchByTagValues={this.getSearchByTagValues} PageUrl={PageUrl} SearchByUrlValue={this.getSearchByUrlValue} />
                        </div>
                        <div class="modal-footer">
                            <button type="button" className="btn btn-primary" onClick={this.handleSearchClick}>Search</button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default FilterResult;
