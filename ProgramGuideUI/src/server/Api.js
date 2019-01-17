import axios from 'axios';
import * as Constant from '../utils/constant';
import * as Generic from '../utils/generic';

export function GetLoginDetails() {
  axios.post(Constant.USER_LOGIN_API, this.UserDetails)
    .then(result => {
      console.log(result.data);
      if (result.data['AuthenticationResponse'] && result.data['UserName']) {
        localStorage.setItem('LoggedInTime', Date.now());
        localStorage.setItem('Login', JSON.stringify(result.data));

        this.isValidUser = true;
        this.Authentication();
      }
      else {
        this.isValidUser = false;
      }
    })
    .catch(err => { console.log(err) });
}

export function GetUniqueContentData() {
  console.log(localStorage.getItem('Market'));
  axios.get(Constant.GET_UNIQUECONTENT_DATA_API + '?marketCode=' + localStorage.getItem('Market'))
    .then(result => {
      console.log(result.data);
      var UniqueContentData = JSON.stringify(result.data).replace(/null/g, "\"\"");
      this.ReportData = JSON.parse(UniqueContentData);
      Generic.generateExcelReport.call(this);
      this.PageUrls = result.data.filter(m => m.IsActive).map(m => { return { name: m.PageUrl } });
      this.setState({ uniqueContentData: JSON.parse(UniqueContentData) });
    })
    .catch(err => {
      console.log(err);
    })
}

export function GetMarkets() {
  axios.get(Constant.GET_USERSPECIFIC_MARKETS + '?userName=' + JSON.parse(localStorage.getItem('Login'))['UserName'])
    .then(result => {
      this.userSpecificMarkets = result.data;
      filterMarkets(this);
    })
    .catch(err => { console.log(err) });
}
//Add comment 
function filterMarkets(instance) {
  axios.get(Constant.GET_UNIQUECONTENT_CONTENT_MARKETS_API)
    .then(res => {
      var uniqueContentMarkets = res.data;
      instance.setState({
        availableMarkets: instance.userSpecificMarkets.filter(m => uniqueContentMarkets.map(m => { return m.MarketCode })
          .includes(m.MarketCode)).sort((a, b) => a.Name.localeCompare(b.Name))
      });
    })
    .catch(err => console.log(err));
}
