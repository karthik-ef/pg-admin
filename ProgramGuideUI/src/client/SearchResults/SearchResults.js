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
import * as API from '../../api/SearchResults';
import * as Constant from '../../utils/constant';
import * as Generic from '../../utils/generic';

import Loader from '../CustomControls/LoadingScreen';

// Excel Declarations
const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;


class SearchResult extends Component {
    constructor() {
        super();
        this.export = false;
        this.EditPageRow = [];
        this.objContent = {}
        this.state = {
            uniqueContentData: [],
            showSearchFilterModal: false,
            showEditContentModal: false,
            isFilterApplied: false
        };
    }

    componentDidMount() {
        API.GetUniqueContentData.call(this);
    }
    // Code Refactoring 

    //Show filter Pop-up
    applyFilter() {
        this.setState({ showSearchFilterModal: true });
    }

    //Reset the state
    clearFilter() {
        this.ReportData = this.state.uniqueContentData;
        Generic.generateExcelReport.call(this);
        this.setState({ isFilterApplied: false });
    }

    filterResultData = (value) => {
        console.log(value)
        if (!value) {
            this.setState({ showSearchFilterModal: false });
            return;
        }
        //Filter search result based on URL
        else if (value.SearchByUrlResult) {
            this.filteredBy = Constant.SEARCH_BY_URL;
            this.filterCriteria = value.SearchByUrlResult;
            this.filteredUniqueContentResult = this.state.uniqueContentData.filter(m => m.PageUrl === value.SearchByUrlResult)
        }
        //Filter search result based on TAG
        else {
            var objUniqueContent = this.state.uniqueContentData;
            this.filteredBy = Constant.SEARCH_BY_TAG;
            var selectedTag = Generic.createSelectedTagArr(value.SearchByTagResult);
            this.filterCriteria = value.SearchByTagResult.slice(0, value.SearchByTagResult.lastIndexOf('_'));
            if (!value.IsActivePage) objUniqueContent = objUniqueContent.filter(m => m.IsActive);
            console.log(selectedTag);
            this.filteredUniqueContentResult = objUniqueContent.flexFilter(selectedTag.filter(m => m.Values !== '*' && m.Field !== 'Duration details'));
        }
        this.ReportData = this.filteredUniqueContentResult;
        Generic.generateExcelReport.call(this);
        this.setState({ isFilterApplied: true, showSearchFilterModal: false });
    }

    editorContentData = (value) => {

        if (value === 'Data updated') window.location.reload();
        //window.location.reload();
        this.setState({ showEditContentModal: !this.state.showEditContentModal });
    }
    //

    render() {
        this.searchResultsData = this.state.isFilterApplied ? this.filteredUniqueContentResult : this.state.uniqueContentData;
        console.log(localStorage.getItem('Market'));
        console.log(this.searchResultsData);
        console.log(!this.searchResultsData);
        if ( localStorage.getItem('Market') !== null && this.searchResultsData.length === 0) {
            return (
                <Loader/>
            )
        }
        else {
            //Data for reactTable
            this.searchResultsData = this.state.isFilterApplied ? this.filteredUniqueContentResult : this.state.uniqueContentData;
            return (
                <div className="itemDiv search__results--wrapper">
                    {!localStorage.getItem('Market')
                        ? <div className="container">
                            <div className="alert alert-danger" role="alert">
                                <p>{Constant.ERROR_SELECT_MARKET}</p>
                            </div>
                        </div> :
                        <div className="container">
                            {/* Alert Message */}
                            {this.state.isFilterApplied
                                ? <div className="alert alert-info" role="alert">
                                    <span className="alert-text__info strong__text"> Filter Applied! </span> <br />
                                    <span className="alert-text__info strong__text"> Number of Pages returned: </span> <span className="alert-text__info secondary__text">{this.searchResultsData.length}</span> <br />
                                    <span className="alert-text__info strong__text">Search URL:</span> <span className="alert-text__info secondary__text">{this.filterCriteria}</span>
                                </div>
                                : <div className="alert alert-info" role="alert">
                                    <p className="alert-text__info strong__text"> Showing {this.searchResultsData.length} Page Urls </p>
                                </div>
                            }

                            {/* Search result Filter Pop-up */}
                            {this.state.showSearchFilterModal ? <FilterResult setData={this} getFilterResultData={this.filterResultData.bind(this)} /> : ''}

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
                                                objContent.UniqueContentData = this.state.uniqueContentData;
                                                objContent.EditRowData = rowInfo['original'];
                                                this.EditPageRow = objContent;
                                                this.setState({ showEditContentModal: true })
                                            }
                                            // console.log("A Td Element was clicked!");
                                            // console.log("it produced this event:", e);
                                            // console.log("It was in this column:", column);
                                            // console.log("It was in this row:", rowInfo);
                                            // console.log("It was in this table instance:", instance);

                                            // IMPORTANT! React-Table uses onClick internally to trigger
                                            // events like expanding SubComponents and pivots.
                                            // By default a custom 'onClick' handler will override this functionality.
                                            // If you want to fire the original onClick handler, call the
                                            // 'handleOriginal' function.
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
            );
        }
    }
}

export default SearchResult;
