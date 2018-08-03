import React, { Component } from 'react';
import $ from 'jquery';
import FilterResult from '../SearchResult/FilterResult'
// Import React Table
import ReactTable from "react-table";
import "react-table/react-table.css";
import EditLog from './Edit.png';
import Download from './Download.png';
import ReactExport from "react-data-export";

// Excel Declarations
const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;
const ExcelColumn = ReactExport.ExcelFile.ExcelColumn;
const ExcelFont = ReactExport.ExcelFile.ExcelFont;

// Data Objects
const UniqueContentData = []; // Hold the data returned from Database
const PageUrlData = []; // Holds data for PageUrl Autosuggest 
var FilteredData = []; // Holds filtered Data
var ExcelData = [];

// Flags
var IsFiltered = false; // True if any filter criteria is applied

//Apply Filter Variables
var FilterCriteria = ''; //Filter Criteria applied on UniqueContentData
var FilteredBy = ''; // Search By Tag or Search By URL

class SearchResult extends Component {
    constructor() {
        super();
        this.handleClick = this.handleClick.bind(this);
        this.myCallback = this.myCallback.bind(this);
        this.FilteredData = [];
        this.IsFiltered = false;

        this.state = {
            showModal: false,
        };
    }
    componentDidMount() {

        // Initialization of Data objects
        this.getSearchResults();

        // Lose the focus on Download button after click
        $('.stlying').click(function () {
            document.activeElement.blur();
        })
    }

    getSearchResults() {
        $.ajax({
            url: 'http://localhost:3001/getUniqueContentResults/?marketCode=es',
            type: 'GET',
            cache: false,
            success: function (data) {
                this.UniqueContentData = data
                this.PageUrlData = this.UniqueContentData.map(m => { return { name: m.PageUrl } });
                this.ExcelData = [
                    {
                        columns: ["PageUrl", "MarketCode", "BannerImage", "VisibleIntroText", "HiddenIntroText", "SubHeader1", "SubHeader2", "ContentText1", "ContentText2", "PageTitle", "MetaTitle", "MetaDescription"],
                        data: this.UniqueContentData.map(m => {
                            return [{ value: m.PageUrl }, { value: m.MarketCode }, { value: m.BannerImage }, , { value: m.VisibleIntroText },
                            { value: m.HiddenIntroText }, { value: m.SubHeader1 }, { value: m.SubHeader2 }, { value: m.ContentText1 }, { value: m.ContentText2 }, { value: m.PageTitle },
                            { value: m.MetaTitle }, { value: m.MetaDescription }]
                        })
                    }
                ]
                this.setState({ showModal: false });
            }.bind(this),
            error: function (xhr, status, err) {
                console.log(err);
            }
        });

    }

    handleClick() {
        this.setState({
            showModal: !this.state.showModal
        });
    }

    myCallback = (modalClosed) => {

        Array.prototype.flexFilter = function (info) {

            // Set our variables
            var matchesFilter, matches = [], count;

            // Helper function to loop through the filter criteria to find matching values
            // Each filter criteria is treated as "AND". So each item must match all the filter criteria to be considered a match.
            // Multiple filter values in a filter field are treated as "OR" i.e. ["Blue", "Green"] will yield items matching a value of Blue OR Green.
            matchesFilter = function (item) {
                count = 0
                for (var n = 0; n < info.length; n++) {

                    if (info[n]["Values"] === '00') {
                        if (item[info[n]["Field"]] === '00' || !item[info[n]["Field"]]) {
                            count++;
                        }
                    }
                    else if (info[n]["Values"] === '?') {
                        if (item[info[n]["Field"]] !== '00' && !item[info[n]["Field"]]) {
                            count++;
                        }
                    }
                    else {
                        if (info[n]["Values"].indexOf(item[info[n]["Field"]]) > -1) {
                            count++;
                        }
                    }
                }
                // If TRUE, then the current item in the array meets all the filter criteria
                return count === info.length;
            }

            // Loop through each item in the array
            for (var i = 0; i < this.length; i++) {
                // Determine if the current item matches the filter criteria
                if (matchesFilter(this[i])) {
                    matches.push(this[i]);
                }
            }

            // Give us a new array containing the objects matching the filter criteria
            return matches;
        }

        if (Array.isArray(modalClosed)) {
            if (Array.isArray(modalClosed[1])) {
                var buildSelectedTag = modalClosed[1].map(m => { return m.Values + '_' }).join().replace(/,/g, ' ');
                this.IsFiltered = true;
                this.FilterCriteria = buildSelectedTag.substring(0, buildSelectedTag.length - 1);
                this.FilteredBy = 'Search Tag';
                this.FilteredData = this.UniqueContentData.flexFilter(modalClosed[1].filter(m => m.Values !== '*'));
            }
            else {
                this.FilteredData = this.UniqueContentData.filter(m => m.PageUrl === modalClosed[1]);
                this.IsFiltered = true;
                this.FilterCriteria = modalClosed[1];
                this.FilteredBy = 'Search URL';
            }
            if (modalClosed[0]) {
                this.setState({
                    showModal: !this.state.showModal
                });
            }
            this.setDataset(); // Call to update the Excel dataset with filtered results
        }

        else {
            if (modalClosed) {
                this.setState({
                    showModal: !this.state.showModal
                });
            }
        }

    }

    setDataset() {
        this.ExcelData = [
            {
                columns: ["PageUrl", "MarketCode", "BannerImage", "VisibleIntroText", "HiddenIntroText", "SubHeader1", "SubHeader2", "ContentText1", "ContentText2", "PageTitle", "MetaTitle", "MetaDescription"],
                data: this.FilteredData.map(m => {
                    return [{ value: m.PageUrl }, { value: m.MarketCode }, { value: m.BannerImage }, , { value: m.VisibleIntroText },
                    { value: m.HiddenIntroText }, { value: m.SubHeader1 }, { value: m.SubHeader2 }, { value: m.ContentText1 }, { value: m.ContentText2 }, { value: m.PageTitle },
                    { value: m.MetaTitle }, { value: m.MetaDescription }]
                })
            }
        ]
    }

    clearFilter() {
        this.IsFiltered = false;
        this.FilteredData = [];
        this.FilteredBy = '';
        this.ExcelData = [
            {
                columns: ["PageUrl", "MarketCode", "BannerImage", "VisibleIntroText", "HiddenIntroText", "SubHeader1", "SubHeader2", "ContentText1", "ContentText2", "PageTitle", "MetaTitle", "MetaDescription"],
                data: this.UniqueContentData.map(m => {
                    return [{ value: m.PageUrl }, { value: m.MarketCode }, { value: m.BannerImage }, , { value: m.VisibleIntroText },
                    { value: m.HiddenIntroText }, { value: m.SubHeader1 }, { value: m.SubHeader2 }, { value: m.ContentText1 }, { value: m.ContentText2 }, { value: m.PageTitle },
                    { value: m.MetaTitle }, { value: m.MetaDescription }]
                })
            }
        ];
        this.setState({showModal: this.state.showModal});
    }

    render() {

        const flag = this.state.showModal;
        console.log(this.IsFiltered);
        return (
            <div className="itemDiv">

                {this.IsFiltered ? <div class="alert alert-info" role="alert">
                    <strong> Filter Applied! </strong> <br /> <strong>{this.FilteredBy}:</strong> {this.FilterCriteria}
                </div> : ''}

                {flag ? <FilterResult callbackFromParent={this.myCallback} PageUrl={this.PageUrlData} /> : null}
                <button type="button" className="btn btn-link" onClick={this.handleClick}>Apply Filter</button>
                <button type="button" className="btn btn-link" onClick={this.clearFilter.bind(this)}>Clear Filter</button>
                <span className="imageFloatLeft"><ExcelFile filename="ProgramGuideReport" element={<button className="stlying"><img className="downloadImage" src={Download} alt="Download" /></button>}>
                    <ExcelSheet dataSet={this.ExcelData} name="Result" />
                </ExcelFile>
                </span>

                <ReactTable
                    data={this.FilteredData.length > 0 ? this.FilteredData : this.UniqueContentData}
                    minRows={0}
                    columns={[
                        {
                            columns: [
                                {
                                    Header: "Page URL",
                                    id: "PageUrl",
                                    accessor: d => d.PageUrl,
                                    sortable: false
                                },
                                {
                                    Header: "Page Title",
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
                                            <span className="floatLeft"> <img src={EditLog} alt="Logo" /></span>
                                        </div>
                                    )

                                }
                            ]
                        }
                    ]}
                    getTdProps={(state, rowInfo, column, instance) => {
                        return {
                            onClick: (e, handleOriginal) => {
                                this.setState({
                                    showModal: !this.state.showModal
                                });
                                console.log("A Td Element was clicked!");
                                console.log("it produced this event:", e);
                                console.log("It was in this column:", column);
                                console.log("It was in this row:", rowInfo);
                                console.log("It was in this table instance:", instance);

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
                    defaultPageSize={100}
                    style={{
                        height: this.FilteredBy === 'Search URL' ? '23%' : this.FilteredBy === 'Search Tag' ? '77%' : '92%'  // This will force the table body to overflow and scroll, since there is not enough room
                    }}
                    className="-striped -highlight"
                />
            </div>
        );
    }
}

export default SearchResult;
