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
            showModal: false
        };
    }
    componentDidMount() {

        this.getSearchResults();
        Array.prototype.flexFilter = function (info) {

            // Set our variables
            var matchesFilter, matches = [], count;

            // Helper function to loop through the filter criteria to find matching values
            // Each filter criteria is treated as "AND". So each item must match all the filter criteria to be considered a match.
            // Multiple filter values in a filter field are treated as "OR" i.e. ["Blue", "Green"] will yield items matching a value of Blue OR Green.
            matchesFilter = function (item) {
                count = 0
                for (var n = 0; n < info.length; n++) {
                    if (info[n]["Values"].indexOf(item[info[n]["Field"]]) > -1) {
                        count++;
                    }
                }
                // If TRUE, then the current item in the array meets all the filter criteria
                return count == info.length;
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

        var data = [
            { ID: 1, Name: "John", Color: "Blue", Location: "Up" },
            { ID: 2, Name: "Pauline", Color: "Green", Location: "Up" },
            { ID: 3, Name: "Ahmed", Color: "Orange", Location: "Left" },
            { ID: 4, Name: "Diego", Color: "Pink", Location: "Up" },
            { ID: 5, Name: "Maria", Color: "Black", Location: "Down" },
            { ID: 6, Name: "Gus", Color: "Green", Location: "Up" },
            { ID: 7, Name: "Brian", Color: "Pink", Location: "Left" },
            { ID: 8, Name: "Shelley", Color: "Green", Location: "Right" },
            { ID: 9, Name: "Leonardo", Color: "Blue", Location: "Right" },
            { ID: 10, Name: "Big Daddy", Color: "Green", Location: "Down" }
        ];

        var criteria = [
            { Field: "Color", Values: ["Green"] },
            { Field: "Location", Values: ["Up", "Down"] }
        ];
        var filtered = data.flexFilter(criteria);
        console.log(filtered);
    }

    getSearchResults() {
        $.ajax({
            url: 'http://localhost:3001/getUniqueContentResults/?marketCode=es',
            type: 'GET',
            cache: false,
            success: function (data) {
                console.log(data)
                Array.prototype.flexFilter = function (info) {

                    // Set our variables
                    var matchesFilter, matches = [], count;
        
                    // Helper function to loop through the filter criteria to find matching values
                    // Each filter criteria is treated as "AND". So each item must match all the filter criteria to be considered a match.
                    // Multiple filter values in a filter field are treated as "OR" i.e. ["Blue", "Green"] will yield items matching a value of Blue OR Green.
                    matchesFilter = function (item) {
                        count = 0
                        for (var n = 0; n < info.length; n++) {
                            if (info[n]["Values"].indexOf(item[info[n]["Field"]]) > -1) {
                                count++;
                            }
                        }
                        // If TRUE, then the current item in the array meets all the filter criteria
                        return count == info.length;
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
                var criteria = [
                    { Field: "Tag_Experience", Values: ["Camps"] },
                    { Field: "Tag_Country", Values: ["JP"] }
                ];
                var filtered = data.flexFilter(criteria);
                console.log(filtered);
                this.setState({ data: data })
            }.bind(this),
            error: function (xhr, status, err) {
                console.log(err);
            }
        });

    }

    searchResults() {
        this.setState({
            data1: [
                { pageUrl: '/pg/auslandsaufenthalt/australien/brisbane/', anchorText: 'auslandsaufenthalt' },
                { pageUrl: '/pg/auslandsaufenthalt/australien/brisbane/', anchorText: 'auslandsaufenthalt' },
                { pageUrl: '/pg/auslandsaufenthalt/australien/brisbane/', anchorText: 'auslandsaufenthalt' },
                { pageUrl: '/pg/auslandsaufenthalt/australien/brisbane/', anchorText: 'auslandsaufenthalt' },
                { pageUrl: '/pg/auslandsaufenthalt/australien/brisbane/', anchorText: 'auslandsaufenthalt' },
                { pageUrl: '/pg/auslandsaufenthalt/australien/brisbane/', anchorText: 'auslandsaufenthalt' },
                { pageUrl: '/pg/auslandsaufenthalt/australien/brisbane/', anchorText: 'auslandsaufenthalt' },
                { pageUrl: '/pg/auslandsaufenthalt/australien/brisbane/', anchorText: 'auslandsaufenthalt' },
                { pageUrl: '/pg/auslandsaufenthalt/australien/brisbane/', anchorText: 'auslandsaufenthalt' },
                { pageUrl: '/pg/auslandsaufenthalt/australien/brisbane/', anchorText: 'auslandsaufenthalt' },
                { pageUrl: '/pg/auslandsaufenthalt/australien/brisbane/', anchorText: 'auslandsaufenthalt' },
                { pageUrl: '/pg/auslandsaufenthalt/australien/brisbane/', anchorText: 'auslandsaufenthalt' },
                { pageUrl: '/pg/auslandsaufenthalt/australien/brisbane/', anchorText: 'auslandsaufenthalt' },

            ]
        });
    }

    handleClick() {
        this.setState({
            showModal: !this.state.showModal
        });
    }

    myCallback = (modalClosed) => {
        if (modalClosed) {
            this.setState({
                showModal: !this.state.showModal
            });
        }
    }

    render() {
        const flag = this.state.showModal;
        return (
            <div className="itemDiv">
                {flag ? <FilterResult callbackFromParent={this.myCallback} /> : null}
                <button type="button" class="btn btn-link" onClick={this.handleClick}>Apply Filter</button>
                <button type="button" class="btn btn-link">Clear Filter</button>

                {/* <Link to="/FilterResult" class="nav-link">Compare Pages</Link> */}
                <span className="floatLeft"> <button type="button" class="btn btn-link">Download Results</button></span>
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
