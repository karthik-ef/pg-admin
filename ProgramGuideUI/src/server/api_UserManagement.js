import axios from 'axios';
import * as API from '../utils/endPoint';
import * as Constant from '../utils/constant';
import { dataForDropDown } from '../utils/generic';

export function getUserManagementDetails() {
    axios.get(API.USER_MANAGEMENT_DETAILS)
        .then(result => {
            this.userNameList = result.data.map(m => { return m.UserName }).filter((x, i, a) => { return a.indexOf(x) === i }).map(m => { return { name: m } });
            this.setState({ userManagementData: result.data });
        }).catch(err => { console.log(err) });
}

export function getAllMarkets(){
    axios.get(API.GET_USER_MARKETS)
    .then(result => {
        this.setState({userMarkets: result.data.map(m => { return { label: m.Name, value: m.MarketCode } }) });
    }).catch(err => console.log(err));
}

export function registerUser(){
    axios.post(API.REGISTER_USER, this.userDetails)
    .then(result => {
        console.log(result);
        window.location.reload();
    }).catch(err => console.log(err));
}

export function deleteUser(){
    axios.post(API.DELETE_USER, this.userDetails)
    .then(result => {
        window.location.reload();
    }).catch(err => {console.log(err)});
}

export function updateUser(){
    axios.post(API.UPDATE_USER, this.userDetails)
    .then(result => {
        window.location.reload();
    }).catch(err => {console.log(err)});
}