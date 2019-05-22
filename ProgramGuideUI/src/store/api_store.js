import axios from 'axios';
import * as EndPoint from '../utils/endpoints';

export function setStoreData() {
    return (dispatch) => {
        dispatch(LoginDetails.call(this));
        dispatch(EfCom20_Content_UserMarkets.call(this));
        dispatch(CreatePageTags.call(this));
        // dispatch(DurationTags.call(this));
        // dispatch(PlatformTags.call(this));
        // dispatch(BannerImages.call(this));
        dispatch(UserDashboard.call(this));
    }
}

//Store login details to Redux store
function LoginDetails() {
    return (dispatch) => {
        axios.get(EndPoint.getUserRoleAndDepartment + this.userName)
            .then((result) => {
                //Check if the user has access to admin tool?
                if (result.data.length > 0) {
                    dispatch({ type: "store_LoginDetails", data: { userName: this.userName, roleName: result.data[0].RoleName } })
                    localStorage.setItem('Token', Date.now());
                    this.isValidUser = true;
                    this.Authorization();
                }
                else {
                    //'User not authorized to use the application error message'
                }
            })
            .catch((err) => { dispatch({ type: 'Err', data: "Error" }) })
    }
}

//Store EfCom20_Content Markets for the logged in user
function EfCom20_Content_UserMarkets() {
    return (dispatch) => {
        axios.get(EndPoint.getUserMarkets + this.userName)
            .then(result => {
                //Check if the user has access to admin tool?
                if (result.data.length > 0) {
                    dispatch({ type: 'store_EfCom20_Content_UserMarkets', data: result.data });
                    dispatch(EfCom_OrganicSearch_UserMarkets(result.data));
                }
            })
            .catch(err => { console.log(err) });
    }
}

//Store EfCom_OrganicSearch Markets & the markets that are available for the logged in user
function EfCom_OrganicSearch_UserMarkets(EfCom20_Content_UserMarkets) {
    return (dispatch) => {
        axios.get(EndPoint.getUniqueContentMarkets)
            .then(result => {
                var uniqueContentMarkets = result.data;
                dispatch({ type: 'store_EfCom_OrganicSearch_Markets', data: uniqueContentMarkets });
                var userMarkets = EfCom20_Content_UserMarkets
                    .filter(m => uniqueContentMarkets
                        .map(m => { return m.MarketCode })
                        .includes(m.MarketCode))
                    .sort((a, b) => a.Name.localeCompare(b.Name));
                var marketsList = userMarkets.map(m => { return m.MarketCode });
                var beginSlice = 0;
                var endSlice = 2;

                for (var i = 0; i < marketsList.length / 2; i++) {
                    dispatch(UniqueContent(marketsList.slice(beginSlice, endSlice).join(',').toString()));
                    dispatch(OtherTags(marketsList.slice(beginSlice, endSlice).join(',').toString()));
                    dispatch(SuggestedKeywords(marketsList.slice(beginSlice, endSlice).join(',').toString()));
                    beginSlice = endSlice;
                    endSlice = endSlice + 2;
                }
                dispatch({ type: 'store_UserMarkets', data: userMarkets });

            })
            .catch(err => { console.log(err) });
    }
}

//Store Suggested keywords data
export function SuggestedKeywords(marketCode) {
    return (dispatch) => {
        axios.get(EndPoint.getKeywords + marketCode)
            .then(result => {
                result.data.length
                    ? dispatch({ type: 'store_SuggestedKeywords', data: result.data })
                    : ''
            })
            .catch(err => { console.log(err) });
    }
}

//Store unique content data for all available markets for the user
export function UniqueContent(marketCode) {
    return (dispatch) => {
        axios.get(EndPoint.exportPgData + marketCode)
            .then(result => {
                marketCode.length === 2 //If the data is updated using content editor reload the pages for the market
                    ? dispatch({ type: 'store_InsertEditedPage', data: result.data })
                    : dispatch({ type: 'store_UniqueContentData', data: result.data })
            })
            .catch(err => { console.log(err) });
    }
}

//Store duration tag data
function DurationTags() {
    return (dispatch) => {
        axios.get(EndPoint.getDurationTagDetails)
            .then(result => { dispatch({ type: 'store_DurationTags', data: result.data }) })
            .catch(err => { console.log(err) });
    }
}

//Store platform tag data
function PlatformTags() {
    return (dispatch) => {
        axios.get(EndPoint.getPlatformTagDetails)
            .then(result => { dispatch({ type: 'store_PlatformTags', data: result.data }) })
            .catch(err => { console.log(err) });
    }
}

//Store unique content tag values for all available markets for the user
function OtherTags(marketCode) {
    return (dispatch) => {
        axios.get(EndPoint.getSearchTagDetails + marketCode)
            .then(result => { dispatch({ type: 'store_UniqueContentTags', data: result.data }) })
            .catch(err => { console.log(err) });
    }
}

//Store banner image data from sitecore
function BannerImages() {
    return (dispatch) => {
        axios.get(EndPoint.getBannerImagesDetails)
            .then(result => { dispatch({ type: 'store_BannerImageData', data: result.data }) })
            .catch(err => { console.log(err) });
    }
}

//Store user management details
export function UserDashboard() {
    return (dispatch) => {
        axios.get(EndPoint.getUserDetails)
            .then(result => { dispatch({ type: 'store_UserDashboardData', data: result.data }) })
            .catch(err => { console.log(err) });
    }
}

// Store website details for sitemap generator
export function SitemapWebsites() {
    return (dispatch) => {
        axios.get(EndPoint.getSitemapWebsites)
            .then(result => {
                dispatch(SitemapMarkets());
                dispatch({ type: 'store_SitemapWebsites', data: result.data })
            })
            .catch(err => { console.log(err) });
    }
}

// Store market details for sitemap generator
export function SitemapMarkets() {
    return (dispatch) => {
        axios.get(EndPoint.getHreflangMappingDetails)
            .then(result => { dispatch({ type: 'store_SitemapMarkets', data: result.data }) })
            .catch(err => { console.log(err) });
    }
}

// Store newly created pages
export function NewPages() {
    return (dispatch) => {
        axios.get(EndPoint.getNewlyCreatedPages)
            .then(result => { dispatch({ type: 'store_NewPagesDetails', data: result.data }) })
            .catch(err => { console.log(err) });
    }
}

// Store newly created pages
export function CreatePageTags() {
    return (dispatch) => {
        axios.get(EndPoint.getCreatePageTagDetails)
            .then(result => { dispatch({ type: 'store_CreatePageTags', data: result.data }) })
            .catch(err => { console.log(err) });
    }
}
