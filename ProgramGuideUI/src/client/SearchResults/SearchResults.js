import React, { Component } from 'react';
import ReactTable from "react-table";
import "react-table/react-table.css";
import EditIcon from '../Icons/SearchResult_Edit.png';
import DownloadIcon from '../Icons/SearchResult_Download.png';
import ApplyFilterIcon from '../Icons/SearchResult_ApplyFilter.png';
import ClearFilterIcon from '../Icons/SearchResult_ClearFilter.png';
import FilterResult from './FilterResult';
import EditContent from '../PageEditor/PageEditor';
import ReactExport from "react-data-export";

import './styles.css';
import * as Constant from '../../utils/constant';
import * as Generic from '../../utils/generic';

import Loader from '../CustomControls/LoadingScreen';
import { connect } from 'react-redux';

// Excel Declarations
const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;


class SearchResult extends Component {
    constructor() {
        super();
        this.export = false;
        this.EditPageRow = [];
        this.objContent = {};
        this.selectedMarket = '';
        this.state = {
            showSearchFilterModal: false,
            showEditContentModal: false,
            isFilterApplied: false
        };
    }

    //Show filter Pop-up
    applyFilter() {
        this.setState({ showSearchFilterModal: true });
    }

    //Reset the state
    clearFilter() {
        this.props.dispatch({ type: 'Store_FilterTagCriteria', data: undefined });
        this.setState({ isFilterApplied: false });
    }

    filterResultData = (value) => {
        if (!value) {
            this.setState({ showSearchFilterModal: false });
            return;
        }
        //Filter search result based on Keyword
        else if (value.SearchByKeywordResult) {
            this.filteredBy = Constant.SEARCH_BY_KEYWORD;
            this.filterCriteria = value.SearchByKeywordResult;
            this.filteredUniqueContentResult = this.props.storeData._uniqueContentData
                .filter(m => m.MarketCode === this.props.storeData._selectedMarket && m.PageUrl.includes(value.SearchByKeywordResult));
        }
        //Filter search result based on URL
        else if (value.SearchByUrlResult) {
            this.filteredBy = Constant.SEARCH_BY_URL;
            this.filterCriteria = value.SearchByUrlResult;
            this.filteredUniqueContentResult = this.props.storeData._uniqueContentData
                .filter(m => m.MarketCode === this.props.storeData._selectedMarket && m.PageUrl === value.SearchByUrlResult);
        }
        //Filter search result based on TAG
        else {
            var objUniqueContent = this.props.storeData._uniqueContentData.filter(m => m.MarketCode === this.props.storeData._selectedMarket);
            this.filteredBy = Constant.SEARCH_BY_TAG;
            var selectedTag = Generic.createSelectedTagArr(value.SearchByTagResult);
            this.filterCriteria = value.SearchByTagResult.slice(0, value.SearchByTagResult.lastIndexOf('_'));
            if (!value.IsActivePage) objUniqueContent = objUniqueContent.filter(m => m.IsActive);
            this.filteredUniqueContentResult = objUniqueContent.flexFilter(selectedTag.filter(m => m.Values !== '*' && m.Field !== 'Duration details'));

            var arrSelectedTags = this.filterCriteria.split('_');
            var objFilterCriteria = {
                [Constant.Tag_Topic]: arrSelectedTags[0],
                [Constant.Tag_When]: arrSelectedTags[1],
                [Constant.Tag_CourseType]: arrSelectedTags[2],
                [Constant.Tag_AgeRange]: arrSelectedTags[3],
                [Constant.Tag_Duration]: arrSelectedTags[4],
                [Constant.Tag_LanguageOfInstruction]: arrSelectedTags[5],
                [Constant.Tag_LanguageLearned]: arrSelectedTags[6],
                [Constant.Tag_Platform]: arrSelectedTags[7],
                [Constant.Tag_Continent]: arrSelectedTags[8],
                [Constant.Tag_Country]: arrSelectedTags[9],
                [Constant.Tag_State]: arrSelectedTags[10],
                [Constant.Tag_City]: arrSelectedTags[11],
                [Constant.Tag_Feature]: arrSelectedTags[12],
                [Constant.Tag_Duration_Details]: arrSelectedTags[13]
            }

            this.props.dispatch({ type: 'Store_FilterTagCriteria', data: objFilterCriteria });
        }
        this.setState({ isFilterApplied: true, showSearchFilterModal: false });
    }

    editorContentData = (value) => {
        if (value === 'closed') {
            this.setState({ showEditContentModal: !this.state.showEditContentModal });
        }
        else {
            this.props.dispatch({ type: 'Store_FilterTagCriteria', data: undefined });
            this.setState({ showEditContentModal: !this.state.showEditContentModal, isFilterApplied: false });
        }
    }
    //

    render() {

        //Clear the filter if market is changed
        this.state.isFilterApplied = this.selectedMarket.length > 0 & this.selectedMarket !== this.props.storeData._selectedMarket
            ? false
            : this.state.isFilterApplied

        //Assign selected market to local variable 
        this.selectedMarket = this.props.storeData._selectedMarket
            ? this.props.storeData._selectedMarket
            : this.selectedMarket

        this.searchResultsData = !this.props.storeData._selectedMarket
            ? []
            : this.state.isFilterApplied
                ? this.filteredUniqueContentResult
                : this.props.storeData._uniqueContentData.filter(m => m.MarketCode === this.props.storeData._selectedMarket);

        //Generate data for the excel report
        this.ExcelData = this.searchResultsData.length > 0 ? Generic.generateExcelReport(this.searchResultsData) : [];

        return (
            !this.props.storeData._selectedMarket //Check if market is selected
                ? <div className="itemDiv search__results--wrapper">
                    <div className="container">
                        <div className="alert alert-danger" role="alert">
                            <p>{Constant.ERROR_SELECT_MARKET}</p>
                        </div>
                    </div>
                </div>
                : !this.searchResultsData.length > 0 && !this.state.isFilterApplied  // Check if there are records for the selected market in unique content table 
                    ? <Loader />
                    // Else render the data table
                    : <div className="itemDiv search__results--wrapper">
                        <div className="container">
                            {/* Alert Message */}
                            {this.state.isFilterApplied
                                ? <div className="alert alert-info" role="alert">
                                    <span className="alert-text__info strong__text"> Filter Applied! </span> <br />
                                    <span className="alert-text__info strong__text"> Number of Pages returned: </span> <span className="alert-text__info secondary__text">{this.searchResultsData.length}</span> <br />
                                    <span className="alert-text__info strong__text">{this.filteredBy}:</span> <span className="alert-text__info secondary__text">{this.filterCriteria}</span>
                                </div>
                                : <div className="alert alert-info" role="alert">
                                    <p className="alert-text__info strong__text"> Showing {this.searchResultsData.length} Page Urls </p>
                                </div>
                            }

                            {/* Search result Filter Pop-up */}
                            {this.state.showSearchFilterModal ? <FilterResult getFilterResultData={this.filterResultData.bind(this)} /> : ''}

                            {/* Content Editor */}
                            {this.state.showEditContentModal ? <EditContent EditPageRow={this.EditPageRow} getEditorContentData={this.editorContentData.bind(this)} /> : null}

                            {/* React Table */}
                            <ReactTable
                                data={this.searchResultsData}
                                minRows={10}
                                columns={[
                                    {
                                        Header: <div>
                                            <span className="imageFloatLeft">
                                                <ExcelFile filename="ProgramGuideReport" element={<img className="imageFloatLeft" src={DownloadIcon} alt="Clear Filter" data-toggle="tooltip" data-placement="top" title="Download" />}>
                                                    <ExcelSheet dataSet={this.ExcelData} name="Result" />
                                                </ExcelFile>
                                            </span>
                                            <img className="imageFloatLeft" src={ClearFilterIcon} alt="Clear Filter" onClick={this.clearFilter.bind(this)} data-toggle="tooltip" data-placement="top" title="Clear Filter" />
                                            <img className="imageFloatLeft" src={ApplyFilterIcon} alt="Apply Filter" onClick={this.applyFilter.bind(this)} data-toggle="tooltip" data-placement="top" title="Apply Filter" />
                                        </div>,
                                        columns: [
                                            {
                                                Header: <strong>Page URL</strong>,
                                                id: "PageUrl",
                                                accessor: d => d.PageUrl,
                                                sortable: false
                                            },
                                            {
                                                Header: <strong>Page Title</strong>,
                                                id: "PageTitle",
                                                accessor: d => d.PageTitle,
                                                sortable: false
                                            },
                                            {
                                                Header: '',
                                                sortable: false,
                                                width: 60,
                                                Cell: row => (
                                                    <div>
                                                        <span className="floatLeft"> <img src={EditIcon} alt="Logo" /></span>
                                                    </div>
                                                )

                                            }
                                        ]
                                    }
                                ]}
                                getTdProps={(state, rowInfo, column, instance) => {
                                    return {
                                        onClick: (e, handleOriginal) => {
                                            console.log(rowInfo)
                                            console.log(!rowInfo)
                                            if (rowInfo) {
                                                var objContent = {};
                                                objContent.UniqueContentData = this.props.storeData._uniqueContentData.filter(m => m.MarketCode === this.props.storeData._selectedMarket);
                                                objContent.EditRowData = rowInfo['original'];
                                                this.EditPageRow = objContent;
                                                this.setState({ showEditContentModal: true })
                                            }
                                            if (handleOriginal) {
                                                handleOriginal();
                                            }
                                        }
                                    };
                                }}

                                defaultPageSize={10}
                                style={
                                    { height: '60%' }
                                }
                                className="-striped -highlight pg-search__table"
                            />
                        </div>
                        }
                    </div>
        )
    }
}

export default connect((state, props) => { return { storeData: state } })(SearchResult);
