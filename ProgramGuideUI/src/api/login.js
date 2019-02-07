import axios from 'axios';
import React from 'react';
import * as API from '../utils/endpoints';

export function UserAuthentication() {
    axios.post(API.userAuthentication, this.UserDetails)
        .then(result => {
            console.log(result.data);
            if (result.data.AuthenticationResponse) {
                UserAuthorization.call(this);
            }
        })
        .catch(err => { console.log(err) });
}

function UserAuthorization() {
    axios.get(API.getUserRoleAndDepartment + this.UserDetails.userName)
        .then(result => {
            if (result.data.length > 0) {
                localStorage.setItem('LoggedInTime', Date.now());
                localStorage.setItem('UserName', JSON.stringify(this.UserDetails.userName));
                localStorage.setItem('Role', JSON.stringify(result.data[0].RoleName));
                this.isValidUser = true;
                this.Authorization();
            }
        })
        .catch(err => { console.log(err) });
}