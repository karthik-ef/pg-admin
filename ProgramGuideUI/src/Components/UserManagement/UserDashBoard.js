import React, { Component } from 'react';
import $ from 'jquery';
import ReactTable from "react-table";

// Data Objects
const UserDetailsData = []; // Hold the data returned from service getUserDetails

const makeDefaultState = () => ({
    expanded: {},
  });

class UserDashBoard extends Component {
    constructor() {
        super();
        this.state = makeDefaultState();
    }
    componentDidMount() {
        // Initialization of Data objects
        this.getSearchResults();
        // Lose the focus on Download button after click
        $('.stlying').click(function () {
            document.activeElement.blur();
        })
    }
    resetState() {
        this.setState(makeDefaultState());
      }
    getSearchResults() {
        $.ajax({
            url: 'http://localhost:3001/getUserDetails/',
            type: 'GET',
            cache: false,
            success: function (data) {
                console.log(data);
                this.UserDetailsData = data
                this.setState({ showModal: false });
            }.bind(this),
            error: function (xhr, status, err) {
                console.log(err);
            }
        });
    }
    render() {
        return (
            <div className="itemDiv">
                <ReactTable
                 data={this.UserDetailsData}
                    minRows={0}
                    columns={[
                        {  
                            columns: [
                                {
                                    Header: <strong>User Name</strong>,
                                    id: "UserName",
                                    accessor: d => d.UserName,
                                    sortable: false
                                },
                                {
                                    Header: <strong>Role Name</strong>,
                                    id: "RoleName",
                                    accessor: d => d.RoleName,
                                    sortable: false
                                },
                                {
                                    Header: <strong>Market Code</strong>,
                                    id: "MarketCode",
                                    accessor: d => d.MarketCode,
                                    sortable: false
                                },
                            ]
                        }
                    ]}
                    pivotBy={["UserName"]}
                    defaultPageSize={100}
                    className="-striped -highlight"

                    expanded={this.state.expanded}
                    onExpandedChange={expanded => this.setState({ expanded })}
                />
            </div>
        );
    }
}
export default UserDashBoard;
