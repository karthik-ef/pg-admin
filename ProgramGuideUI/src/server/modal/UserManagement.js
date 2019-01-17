import axios from 'axios';
import * as Constant from '../../utils/constant';

export function GetUserDetails() {
  axios.get(Constant.GET_USER_DETAILS_API)
    .then(result => {
      var data = result.data;
      this.UserDetailsData = data;
      this.UserNames = data.map(u => { return u.UserName }).filter(function (x, i, a) {
        return a.indexOf(x) == i;
      }).map(m => { return { name: m } });
      this.setState({ showModal: false });
    })
    .catch(err => { console.log(err) });
}

export function GetMarkets() {
  axios.get(Constant.GET_MARKETS_API)
    .then(result => {
      var data = result.data;
      this.MarketsList = data;
      this.setState({ Markets: data.map(m => { return { label: m.Name, value: m.MarketCode } }) });
    })
    .catch(err => { console.log(err) });
}

export function RegisterUser() {
  axios.post(Constant.RESGISTER_USER_API, this.state.saveUserDetails)
    .then(result => {
      console.log(result)
      window.location.reload();
    })
    .catch(err => { console.log(err) })
}

export function UpdateUser() {
  axios.post(Constant.UPDATE_USER_API, this.state.UpdateUserDetails)
  .then(result => {window.location.reload()})
  .catch(err => {console.log(err)});
}

export function DeleteUserId() {
  axios.post(Constant.DELETE_USER_API, this.user)
  .then(result => {window.location.reload()})
  .catch(err => {console.log(err)});
}