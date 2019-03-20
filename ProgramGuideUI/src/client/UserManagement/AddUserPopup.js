import React, { Component } from 'react';
import $ from 'jquery';
import AddUser from './AddUser';
import DeleteUser from './DeleteUser';
import EditUser from './EditUser';

import * as Constant from '../../utils/constant';

class AddUserPopup extends Component {

    constructor() {
        super();
    }

    componentDidMount() {
        $('#exampleModalLong').modal('show');
    }

    modalClose() {
        this.props.getUserModalData(true);
    }

    ComponentData() {
        $('#exampleModalLong').modal('hide');
        this.props.getUserModalData(true);
    }
    
    render() {
        return (
            <div className="modal fade" id="exampleModalLong" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLongTitle" aria-hidden="true" data-backdrop="static" data-keyboard="false">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <br />

                            <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={this.modalClose.bind(this)}>
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            {this.props.setData.userOperation === Constant.ADD_USER
                                ? <AddUser setData={this.props.setData} getAddUserData={this.ComponentData.bind(this)} />
                                : this.props.setData.userOperation === Constant.EDIT_USER
                                    ? <EditUser setData={this.props.setData} getEditUserData={this.ComponentData.bind(this)} />
                                    : <DeleteUser setData={this.props.setData} getDeleteUserData={this.ComponentData.bind(this)} />}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default AddUserPopup;
