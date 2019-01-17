import react from 'react';

export function IsValidUser(){
    console.log(this.SelectedUserName);
    if(this.props.UserDetailsData.filter(m => m.UserName === this.SelectedUserName).length <= 0 && this.SelectedUserName != '')
        { 
          alert('User does not exist');
          return false;
        }
        else
        {
            this.user = {}
            this.user.userId = this.props.UserDetailsData.filter(m => m.UserName === this.SelectedUserName)[0]["UserPermission_Id"];
            return true;
        }
}