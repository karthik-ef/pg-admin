import axios from 'axios';
import * as API from '../utils/endpoints';
import * as StoreData from '../../src/store/api_store';

// export function getUserDetails() {
//     axios.get(API.getUserDetails)
//         .then(result => {
//             this.userNameList = result.data.map(m => { return m.UserName }).filter((x, i, a) => { return a.indexOf(x) === i }).map(m => { return { name: m } });
//             this.setState({ userManagementData: result.data });
//         }).catch(err => { console.log(err) });
// }

export function registerUser(){
    axios.post(API.registerUser, this.userDetails)
    .then(result => {
        console.log(result.data);
        alert('User added successfully');
        this.props.dispatch(StoreData.UserDashboard.call(this));
    }).catch(err => console.log(err));
}

export function deleteUser(){
    axios.post(API.deleteUser, this.userDetails)
    .then(result => {
        alert('User deleted successfully');
        this.props.dispatch(StoreData.UserDashboard.call(this));
    }).catch(err => {console.log(err)});
}

export function updateUser(){
    axios.post(API.updateUser, this.userDetails)
    .then(result => {
        alert('Updated the user details successfully');
        this.props.dispatch(StoreData.UserDashboard.call(this));

    }).catch(err => {console.log(err)});
}