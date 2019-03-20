import React, { Component } from 'react';
import FilterResult from '../SearchResults/FilterResult';
import $ from 'jquery';
import * as Generic from '../../utils/generic';
import ReactExport from "react-data-export";
import { connect } from 'react-redux';
import DropDown from '../CustomControls/DropDown';

// Excel Declarations
const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;

class ExportPgData extends Component {
    constructor() {
        super();
        this.isDisabled = true;
        this.customizedData = [];
        this.state = { isDataLoaded: false, customize: false };
        this.selectedMarket = [];
    }

    filterResultData = (value) => {
        if (value.SearchByUrlResult) {
            this.filterType = 'Search URL:';
            this.filterCriteria = value.SearchByUrlResult
            this.customizedData = this.props.storeData._uniqueContentData
                .filter(m => m.PageUrl === value.SearchByUrlResult && this.selectedMarket.includes(m.MarketCode));
        }
        else if (value.SearchByTagResult) {
            this.filterType = 'Search Tag:';
            this.filterCriteria = value.SearchByTagResult
            var selectedTag = Generic.createSelectedTagArr(value.SearchByTagResult);
            this.customizedData = this.props.storeData._uniqueContentData.filter(m => this.selectedMarket.includes(m.MarketCode))
                .flexFilter(selectedTag
                    .filter(m => m.Values !== '*' && m.Values !== '' && m.Field !== 'Duration details'));
        }
        else {
            this.customizedData = [];
        }
        this.setState({ customize: false });
    }
    BindMarkets(value) {
        if (!value) {
            this.isDisabled = true;
            this.customizedData = [];
            this.selectedMarket = [];
        }
        else {
            this.selectedMarket = value.split(',');
            console.log(this.selectedMarket);
            this.isDisabled = false;
        }
        // Comment
        if (this.customizedData.length > 0) {

            if (this.filterType === 'Search URL:') {
                this.customizedData = this.props.storeData._uniqueContentData
                    .filter(m => m.PageUrl === this.filterCriteria && this.selectedMarket.includes(m.MarketCode));
            }
            else {
                var selectedTag = Generic.createSelectedTagArr(this.filterCriteria);
                this.customizedData = this.props.storeData._uniqueContentData.filter(m => this.selectedMarket.includes(m.MarketCode))
                    .flexFilter(selectedTag
                        .filter(m => m.Values !== '*' && m.Values !== '' && m.Field !== 'Duration details'));
            }
        }
        this.setState({});
    }

    customize() {
        this.setState({ customize: true });
    }

    render() {

        //Generate data for excel report
        this.ExcelData = this.props.storeData._uniqueContentData && !this.customizedData.length > 0
            ? Generic.generateExcelReport(this.props.storeData._uniqueContentData.filter(m => this.selectedMarket.includes(m.MarketCode)))
            : Generic.generateExcelReport(this.customizedData);

        return (
            <div className="itemDiv add-users__wrapper">
                <div className="container">
                    {this.selectedMarket.length > 0
                        ?
                        this.customizedData.length > 0
                            ?
                            <div className="alert alert-info" role="alert">
                                <span className="alert-text__info strong__text"> Filter Applied! </span> <br />
                                <span className="alert-text__info strong__text"> Number of Pages returned: </span> <span className="alert-text__info secondary__text">{this.customizedData.length}</span> <br />
                                <span className="alert-text__info strong__text">{this.filterType}</span> <span className="alert-text__info secondary__text">{this.filterCriteria}</span>
                            </div>
                            :
                            <div className="alert alert-info" role="alert">
                                <span className="alert-text__info strong__text"> Number of Pages returned: </span> <span className="alert-text__info secondary__text">{this.props.storeData._uniqueContentData.filter(m => this.selectedMarket.includes(m.MarketCode)).length}</span> <br />
                            </div>
                        : ''
                    }
                    {this.state.customize ? <FilterResult getFilterResultData={this.filterResultData.bind(this)} /> : ''}
                    <label htmlFor="exampleInputEmail1"><strong>Select Market(s) to export the data</strong></label>
                    <div className="row">
                        <div className="input-group">
                            <div className="col-sm-4">
                                <DropDown
                                    Markets={this.props.storeData._efCom_OrganicSearch_Markets
                                        .map(m => { return { label: m.Name, value: m.MarketCode } })}
                                    multiSelect={true}
                                    bindedMarketValue={this.BindMarkets.bind(this)}
                                />
                            </div>
                            <button className="btn btn-dark" type="button" disabled={this.isDisabled} onClick={this.customize.bind(this)} >Customize</button>
                        </div>
                    </div>
                    <br />
                    <ExcelFile filename="PG-Data"
                        element={<button className="btn btn-primary" type="button" disabled={this.isDisabled}>Export</button>}>
                        <ExcelSheet dataSet={this.ExcelData} name="Result" />
                    </ExcelFile>
                </div>
            </div>
        );
    }
}

export default connect((state, props) => { return { storeData: state } })(ExportPgData);
