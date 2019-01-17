import React, { Component } from 'react';
import $ from 'jquery';
import ReactTable from "react-table";
import AddUserIcon from '../Icons/UserManagement_AddUser.png';
import EditIcon from '../Icons/UserManagement_EditUser.png';
import DeleteUser from '../Icons/UserManagement_DeleteUser.png';
import AddUserPopup from './AddUserPopup'

import './styles.css';
import * as API from '../../server/api_UserManagement';
import * as Constant from '../../utils/constant';


class UserDashboard extends Component {
    constructor() {
        super();
        this.state = [{
            showUserManagementModal: false
        }]
    }
    componentDidMount() {
        // Initialization of Data objects
        // Lose the focus on Download button after click
        $('.stlying').click(function () {
            document.activeElement.blur();
        })
        API.getUserManagementDetails.call(this);
    }

    userOperations(operation, event) {
        this.userOperation = operation;
        this.setState({ showUserManagementModal: !this.state.showUserManagementModal });
    }

    userModalData() {
        this.setState({ showUserManagementModal: !this.state.showUserManagementModal });
    }

    render() {
        return (
            <div className="itemDiv add-users__wrapper">
                <div className="container">
                    {this.state.showUserManagementModal ? <AddUserPopup setData={this} getUserModalData={this.userModalData.bind(this)} /> : ''}

                    <ReactTable
                        data={this.state.userManagementData}
                        minRows={0}
                        columns={[
                            {
                                Header:
                                    <div className="header-icon__wrapper">
                                        <span className="imageFloatLeft"><img src={AddUserIcon} onClick={this.userOperations.bind(this, Constant.ADD_USER)} alt={Constant.ADD_USER} data-toggle="tooltip" data-placement="top" title={Constant.ADD_USER} /></span>
                                        <span className="imageFloatLeft"><img src={DeleteUser} onClick={this.userOperations.bind(this, Constant.DELETE_USER)} alt={Constant.DELETE_USER} data-toggle="tooltip" data-placement="top" title={Constant.DELETE_USER} /></span>
                                        <span className="imageFloatLeft"><img src={EditIcon} onClick={this.userOperations.bind(this, Constant.EDIT_USER)} alt={Constant.EDIT_USER} data-toggle="tooltip" data-placement="top" title={Constant.EDIT_USER} /></span>

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
                                    },
                                    {
                                        Header: <strong>Market Code</strong>,
                                        id: "MarketCode",
                                        accessor: d => d.MarketCode,
                                        sortable: false
                                    }
                                ]
                            }
                        ]}
                        pivotBy={["RoleName", "UserName"]}
                        className="-striped -highlight add-user__table"
                        showPagination = {false}
                        showPageSizeOptions ={false}
                        expanded={this.state.expanded}
                        onExpandedChange={expanded => this.setState({ expanded })}
                    />
                </div>
            </div>
        );
    }
}
export default UserDashboard;
