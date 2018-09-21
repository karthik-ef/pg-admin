import React, { Component } from 'react';
import $ from 'jquery';
import TextBox from '../CustomTextBox';

let user = {}

class DeleteUser extends Component {
    constructor() {
        super();
        this.isValue = false;
    }
    getSelectedValue(value) {
         console.log(this.props.UserDetailsData);
        if(this.props.UserDetailsData.filter(m => m.UserName === value).length <= 0 && value != '')
        { 
          alert('User does not exist');
        }
        else
        {
            this.isValue = true;
            user.userId = this.props.UserDetailsData.filter(m => m.UserName === value)[0]["UserPermission_Id"];
        }
    }
    handleSubmit(e) {
        if(!this.isValue)
        {
            alert('User does not exist');
            window.stop();
        }
        else
        {
            e.preventDefault();
            $.ajax({
            url: 'http://ctdev.ef.com:3000/DeleteUser/',
            type: 'POST',
            dataType: 'TEXT',
            data: user,
            cache: false,
            success: function (data) {
                window.location.reload();
            }.bind(this),
            error: function (xhr, status, err) {
              console.log(err);
            }
          });
        }
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
