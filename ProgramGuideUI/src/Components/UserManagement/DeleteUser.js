import React, { Component } from 'react';
import $ from 'jquery';
import TextBox from '../CustomTextBox';

let user = {}

class DeleteUser extends Component {
    
    getSelectedValue(value) {
        console.log(value);
        user.userId = this.props.UserDetailsData.filter(m => m.UserName === value)[0]["UserPermission_Id"];
    }
    handleSubmit(e) {
        e.preventDefault();
        $.ajax({
            url: 'http://localhost:3001/DeleteUser/',
            type: 'POST',
            dataType: 'TEXT',
            data: user,
            cache: false,
            success: function (data) {
            }.bind(this),
            error: function (xhr, status, err) {
              console.log(err);
            }
          });
    }
    render() {
        
        return (
            <div classname="DeleteUser">
                <form className="form-horizontal" onSubmit={this.handleSubmit.bind(this)}>
                    <TextBox PageUrl={this.props.UserNamesAutoBind} selectedValue={this.getSelectedValue.bind(this)} />
                    <div className="col-sm-12 text-center">
                        <input type="submit" value="Delete" className="btn btn-primary" />
                    </div>
                </form>
            </div>
        );
    }
}
export default DeleteUser;
