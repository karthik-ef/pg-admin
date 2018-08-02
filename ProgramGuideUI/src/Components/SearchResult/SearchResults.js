import React, { Component } from 'react';
import $ from 'jquery';
import FilterResult from '../SearchResult/FilterResult'
// Import React Table
import ReactTable from "react-table";
import "react-table/react-table.css";
import EditLog from './Edit.png';
import Download from './Download.png';
import ReactExport from "react-data-export";

const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;
const ExcelColumn = ReactExport.ExcelFile.ExcelColumn;
const ExcelFont = ReactExport.ExcelFile.ExcelFont;

class SearchResult extends Component {
    constructor() {
        super();
        this.handleClick = this.handleClick.bind(this);
        this.myCallback = this.myCallback.bind(this);

        this.state = {
            data: [],
            showModal: false,
            selectedTag: '',
            isFilterApplied: false,
            pageUrls: [],
            selectedFilterOption: '',
            gridHeight: '400px',
            multiDataSet:[]
        };
    }
    componentDidMount() {

        this.getSearchResults();

        $('.stlying').click(function(){
            document.activeElement.blur();
        })
    }

    getSearchResults() {
        $.ajax({
            url: 'http://localhost:3001/getUniqueContentResults/?marketCode=es',
            type: 'GET',
            cache: false,
            success: function (data) {
                this.setState({
                    data: data.map(m => {
                        return [{ value: m.PageUrl }, { value: m.MarketCode }, { value: m.BannerImage }, , { value: m.VisibleIntroText },
                        { value: m.HiddenIntroText }, { value: m.SubHeader1 }, { value: m.SubHeader2 }, { value: m.ContentText1 }, { value: m.ContentText2 }, { value: m.PageTitle },
                        { value: m.MetaTitle }, { value: m.MetaDescription }]
                    }).slice(0, 1)
                }, function () {
                    this.setDataset();
                })
                console.log(data.map(m => { return [{ name: m.PageUrl }, { name: m.MarketCode }] }).slice(0, 10))
                this.setState({ data: data, pageUrls: data.map(m => { return { name: m.PageUrl } }) })
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

            if (modalClosed[0]) {
                this.setState({
                    showModal: !this.state.showModal
                });
            }


            if (Array.isArray(modalClosed[1])) {
                var selectedTag = modalClosed[1].map(m => { return m.Values + '_' }).join().replace(/,/g, ' ');
                selectedTag = selectedTag.substring(0, selectedTag.length - 1);
                var result = modalClosed[1].filter(m => m.Values !== '*');
                this.setState({ data: this.state.data.flexFilter(result), selectedTag: selectedTag, isFilterApplied: true, selectedFilterOption: 'Search Tag' });
            }
            else {
                this.setState({ data: this.state.data.filter(m => m.PageUrl === modalClosed[1]), selectedTag: modalClosed[1], isFilterApplied: true, selectedFilterOption: 'Search URL' });
            }

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
        console.log(this.state.data);
        const multiDataSet = [
            {
                columns: ["PageUrl", "MarketCode", "BannerImage", "VisibleIntroText", "HiddenIntroText", "SubHeader1", "SubHeader2", "ContentText1", "ContentText2", "PageTitle", "MetaTitle", "MetaDescription"],
                data: this.state.data
            }
        ]
        this.setState({ multiDataSet: multiDataSet })

    }

    render() {

        const flag = this.state.showModal;
        console.log(this.state.data)
        return (
            <div className="itemDiv">
                {flag ? <FilterResult callbackFromParent={this.myCallback} PageUrl={this.state.pageUrls} /> : null}
                <button type="button" className="btn btn-link" onClick={this.handleClick}>Apply Filter</button>
                <button type="button" className="btn btn-link">Clear Filter</button>

                {/* <Link to="/FilterResult" class="nav-link">Compare Pages</Link> */}
                {/* <span className="floatLeft"><img src={Download} alt="Download" /></span>
                <span className="floatLeft"><img src={Download1} alt="Download" /></span>
                <span className="floatLeft"><img src={Download2} alt="Download" /></span>
                <span className="floatLeft"><img src={Download3} alt="Download" /></span> */}
                <span className="imageFloatLeft"><ExcelFile filename = "ProgramGuideReport" element={<button className="stlying"><img className="downloadImage" src={Download} alt="Download" /></button>}>
                    <ExcelSheet dataSet={this.state.multiDataSet} name="Result" />
                </ExcelFile>
                </span>


                {this.state.isFilterApplied ? <div class="alert alert-info" role="alert">
                    <strong> Filter Applied! </strong> <br /> <strong>{this.state.selectedFilterOption}:</strong> {this.state.selectedTag}
                    {/* <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button> */}
                </div> : ''}
                <ReactTable
                    data={this.state.data}
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
                        height: this.state.selectedFilterOption === 'Search URL' ? '23%' : '90%'  // This will force the table body to overflow and scroll, since there is not enough room
                    }}
                    className="-striped -highlight"
                />
            </div>
        );
    }
}

export default SearchResult;
