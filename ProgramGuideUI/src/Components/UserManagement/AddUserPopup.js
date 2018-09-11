import React, { Component } from 'react';
import $ from 'jquery';
import AddUser from './AddUser';
import DeleteUser from './DeleteUser';
import EditUser from './EditUser';

class AddUserPopup extends Component {

    constructor() {
        super();
    }

    componentDidMount() {
        $('#exampleModalLong').modal('show');
    }

   
    render() {
        let type = this.props.Operations;
        let UserNamesList = this.props.UserNamesList;
        let UserDetailsData = this.props.UserDetailsData;
        console.log(UserNamesList);
        return (
            <div className="modal fade" id="exampleModalLong" tabindex="-1" role="dialog" aria-labelledby="exampleModalLongTitle" aria-hidden="true" data-backdrop="static" data-keyboard="false">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <br />
                            {type}
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={this.handleCloseClick}>
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div class="modal-body">
                           {type === 'Add User'? <AddUser UserNamesList = {this.props.UserNamesList}/>: type === 'Edit User' ? <EditUser UserNamesList = {this.props.UserNamesList} UserDetailsData = {UserDetailsData}/> : <DeleteUser UserNamesAutoBind = {UserNamesList}  UserDetailsData = {UserDetailsData} />}
                        </div>
                        {/* <div class="modal-footer">
                            <button type="button" className="btn btn-primary">Save</button>
                        </div> */}
                    </div>
                </div>
            </div>
        );
    }
}

export default AddUserPopup;
