import axios from 'axios';
import * as API from '../utils/endpoints';

export function getUserDetails() {
    axios.get(API.getUserDetails)
        .then(result => {
            this.userNameList = result.data.map(m => { return m.UserName }).filter((x, i, a) => { return a.indexOf(x) === i }).map(m => { return { name: m } });
            this.setState({ userManagementData: result.data });
        }).catch(err => { console.log(err) });
}

export function getUniqueContentMarkets() {
    axios.get(API.getUniqueContentMarkets)
        .then(result => {
            this.setState({userMarkets: result.data.map(m => { return { label: m.Name, value: m.MarketCode } }) });
        })
        .catch(err => { console.log(err) });
}

export function registerUser(){
    axios.post(API.registerUser, this.userDetails)
    .then(result => {
        window.location.reload();
    }).catch(err => console.log(err));
}

export function deleteUser(){
    axios.post(API.deleteUser, this.userDetails)
    .then(result => {
        window.location.reload();
    }).catch(err => {console.log(err)});
}

export function updateUser(){
    axios.post(API.updateUser, this.userDetails)
    .then(result => {
        window.location.reload();
    }).catch(err => {console.log(err)});
}