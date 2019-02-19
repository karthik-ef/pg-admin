import axios from 'axios';
import * as API from '../utils/endpoints';

export function getBannerImageDetails() {
    axios.get(API.getBannerImagesDetails)
        .then(result => {
            console.log(result.data);
            this.setState({ createBannerImage: result.data });
        }).catch(err => { console.log(err) });
}

export function getMaxOfUniqueContentId() {
    axios.get(API.getMaxOfUniqueContentId)
        .then(result => {
            console.log(result.data);
            this.maxOfUniqueContentId = Number(result.data.map(m => {return m.UniqueContent_ID}));
        }).catch(err => { console.log(err) });
}

export function getCustomizedLinksDetails() {
    axios.get(API.getCustomizedLinksDetails + this.props.setDrillDownData['UniqueContent_ID'])
        .then(result => {
            console.log(result.data);
            this.getCustomizedLinksData = result.data;
            console.log(result.data);
            this.getFeatureTag3Results = result.data.filter(m => m.Type === false);
            this.getCustomizedFeatureTagResults = result.data.filter(m => m.Type === true);
            console.log(this.getFeatureTag3Results)
        }).catch(err => { console.log(err) });
}

export function getDrillDownAliasDetails() {
    axios.get(API.getDrillDownAliasDetails + this.props.setData)
        .then(result => {
            console.log(result.data);
            this.drillDownAliasData = result.data
            this.setState({ showPreviewData: false });
            console.log(result.data);
        }).catch(err => { console.log(err) });
}

export function saveCustomizedLinksDetails() {
    console.log(this.objCustomizedData);
    axios.post(API.saveCustomizedLinksDetails, this.objCustomizedData)
        .then(result => {
            console.log(result);
        }).catch(err => { console.log(err) });
}

export function saveDrilldownAliasTagsDetails() {
    console.log(this.objDrillDownAlias);
    axios.post(API.saveDrilldownAliasTagsDetails, this.objDrillDownAlias)
        .then(result => {
            console.log(result);
        }).catch(err => { console.log(err) });
}

export function updateUniqueContent() {
    axios.post(API.updateUniqueContent, this.modifiedData)
        .then(result => {
            console.log(result);
            alert('Changes are successfully saved');
        }).catch(err => { console.log(err) });
}

export function createNewPage() {
    axios.post(API.createNewPage, this.modifiedData)
        .then(result => {
            alert('Page is successfullt created');
            console.log(result);
        }).catch(err => { console.log(err) });
}