import React, { Component } from 'react';
import $ from 'jquery';
import FilterResult from '../SearchResult/FilterResult'
// Import React Table
import ReactTable from "react-table";
import "react-table/react-table.css";
import EditLog from './Edit.png';

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
            pageUrls: []
        };
    }
    componentDidMount() {

        this.getSearchResults();
    }

    getSearchResults() {
        $.ajax({
            url: 'http://localhost:3001/getUniqueContentResults/?marketCode=es',
            type: 'GET',
            cache: false,
            success: function (data) {
                console.log(data.map(m=>{return {name: m.PageUrl}}))
                this.setState({ data: data, pageUrls: data.map(m=>{return {name: m.PageUrl}}) })
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
        if (Array.isArray(modalClosed)) {

            if (modalClosed[0]) {
                this.setState({
                    showModal: !this.state.showModal
                });
            }

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
            var selectedTag = modalClosed[1].map(m => {return m.Values + '_'}).join().replace(/,/g,' ');
            selectedTag = selectedTag.substring(0, selectedTag.length-1);
            var result = modalClosed[1].filter(m => m.Values !== '*');
            this.setState({ data: this.state.data.flexFilter(result), selectedTag: selectedTag, isFilterApplied: true });
            
        }

        else {
            if (modalClosed) {
                this.setState({
                    showModal: !this.state.showModal
                });
            }
        }

    }

    render() {

        const flag = this.state.showModal;
        return (
            <div className="itemDiv">
                {flag ? <FilterResult callbackFromParent={this.myCallback} PageUrl = {this.state.pageUrls}  /> : null}
                <button type="button" className="btn btn-link" onClick={this.handleClick}>Apply Filter</button>
                <button type="button" className="btn btn-link">Clear Filter</button>

                {/* <Link to="/FilterResult" class="nav-link">Compare Pages</Link> */}
                <span className="floatLeft"> <button type="button" className="btn btn-link">Download Results</button></span>
               
               {this.state.isFilterApplied ? <div class="alert alert-info" role="alert">
                    <strong> Filter Applied! </strong> <br /> <strong>Search Tag:</strong> {this.state.selectedTag}
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
                    defaultPageSize={10}
                    style={{
                        height: "400px" // This will force the table body to overflow and scroll, since there is not enough room
                    }}
                    className="-striped -highlight"
                />
            </div>
        );
    }
}

export default SearchResult;
