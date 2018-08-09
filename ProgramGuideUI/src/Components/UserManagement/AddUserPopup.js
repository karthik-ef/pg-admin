import React, { Component } from 'react';
import $ from 'jquery';


class AddUserPopup extends Component {

    constructor() {
        super();
    }

    componentDidMount() {
        $('#exampleModalLong').modal('show');
    }

   
    render() {
        let type = this.props.Operations;
        return (
            <div className="modal fade" id="exampleModalLong" tabindex="-1" role="dialog" aria-labelledby="exampleModalLongTitle" aria-hidden="true" data-backdrop="static" data-keyboard="false">
                <div className="modal-dialog modal-lg" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <br />
                            {type}
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={this.handleCloseClick}>
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div class="modal-body">
                           {type === 'Add User'? 'Add User': type === 'Edit User' ? 'Edit User' : 'Delete User'}
                        </div>
                        <div class="modal-footer">
                            <button type="button" className="btn btn-primary">Save</button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default AddUserPopup;