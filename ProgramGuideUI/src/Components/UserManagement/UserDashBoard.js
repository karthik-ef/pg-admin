import React, { Component } from 'react';
import $ from 'jquery';
import ReactTable from "react-table";
import AddUser from './AddUser.png';
import EditUser from './EditUser.png';
import DeleteUser from './DeleteUser.png';
import AddUserPopup from '../UserManagement/AddUserPopup'
// Data Objects
const UserDetailsData = []; // Hold the data returned from service getUserDetails
const UserNames = [];
var Operations = '';

// const makeDefaultState = () => ({
//     expanded: {},
//   });

class UserDashBoard extends Component {
    constructor() {
        super();
       // this.state = makeDefaultState();
        this.Operations = '';
        this.state = [{
            showModal: false
        }]

        this.handleClick = this.handleClick.bind(this);
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
        // this.setState(makeDefaultState());
      }
    getSearchResults() {
        $.ajax({
            url: 'http://ctdev.ef.com:3000/getUserDetails/',
            type: 'GET',
            cache: false,
            success: function (data) {
                console.log(data);
               this.UserDetailsData = data;
               this.UserNames = data.map(u=> {return u.UserName}).filter(function (x, i, a) { 
                return a.indexOf(x) == i; 
            }).map(m=> {return  {name: m}}) ;
               console.log(this.UserNames);
                this.setState({ showModal: false });
            }.bind(this),
            error: function (xhr, status, err) {
                console.log(err);
            }
        });
    }
    handleClick(operations,event)
    {
        this.Operations = operations;
        this.setState({showModal: !this.state.showModal});
    }

    render() {
        let flag = this.state.showModal;

        return (
            <div className="itemDiv">
           {flag ? <AddUserPopup UserNamesList = {this.UserNames} UserDetailsData = {this.UserDetailsData}  Operations={this.Operations}/> : ''} 
                <ReactTable
                 data={this.UserDetailsData}
                    minRows={0}
                    columns={[
                        {  
                            Header: <div>  
                            <img className="floatLeft1" src={AddUser} alt="AddUser" onClick={this.handleClick.bind(this,'Add User')} data-toggle="tooltip" data-placement="top" title="Add User" />
                            <span className="floatLeft1"> <img src={EditUser} alt="EditUser" onClick={this.handleClick.bind(this,'Edit User')} data-toggle="tooltip" data-placement="top" title="Edit User" /></span>
                            <span className="floatLeft1"> <img src={DeleteUser} alt="DeleteUser" onClick={this.handleClick.bind(this,'Delete User')} data-toggle="tooltip" data-placement="top" title="Delete User" /></span>
                            </div>,
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
                                }
                            ]
                        },{
                        columns: [
                            {
                                Header: <strong>Market Code</strong>,
                                id: "MarketCode",
                                accessor: d => d.MarketCode,
                                sortable: false
                            },
                        ]
                    }
                    ]}
                    pivotBy={["RoleName","UserName"]}
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
