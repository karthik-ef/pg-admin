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
    }

    getSearchResults() {
        $.ajax({
            url: 'http://localhost:3001/getUniqueContentResults/?marketCode=es',
            type: 'GET',
            cache: false,
            success: function (data) {
                console.log(data)
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
        if(modalClosed){
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
