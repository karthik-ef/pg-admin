import axios from 'axios';
import React from 'react';
import * as API from '../utils/endpoints';
import * as StoreData from '../../src/store/api_store';

export function BulkUpload() {
    axios.post(API.bulkUpload, this.uploadExcelDetails)
        .then(result => {
            bulkUploadDetail.call(this);

            //Remove all pages for the edited market
            this.props.dispatch({
                type: 'store_RemoveEditedPage',
                data: this.props.storeData._uniqueContentData
                    .filter(m => !this.uploadedMarketsList
                        .map(m => m.MarketCode)
                        .filter((x, i, a) => { return a.indexOf(x) === i })
                        .includes(m.MarketCode))
            })
            //Fetch the latest pages for the edited market
            var marketsList = this.uploadedMarketsList
                .map(m => { return m.MarketCode })
                .filter((x, i, a) => { return a.indexOf(x) === i });
            var beginSlice = 0;
            var endSlice = 2;

            for (var i = 0; i < marketsList.length / 2; i++) {
                this.props.dispatch(StoreData.UniqueContent(marketsList.slice(beginSlice, endSlice).join(',').toString()));

                beginSlice = endSlice;
                endSlice = endSlice + 2;
            }

            alert('File is uploaded sucessfully');
        }).catch(err => { console.log(err) });
}

function bulkUploadDetail() {
    axios.post(API.bulkUploadDetail, this.BulkUploadDetails)
        .then(result => {
            getBulkUploadDetails.call(this);
        }).catch(err => { console.log(err) });
}

export function getBulkUploadDetails() {
    axios.get(API.getBatchDetails + this.props.storeData._loginDetails.userName)
        .then(result => {
            this.batchDetails = result.data;
            var previousBatchId = 0;
            var distinctBatchDetailsData = [];
            result.data.forEach(element => {
                element.BATCH_ID !== previousBatchId
                    ? distinctBatchDetailsData.push(element)
                    : ''
                previousBatchId = element.BATCH_ID;
            });
            this.setState({
                bulkUploadDetailsData: distinctBatchDetailsData.map(m => {
                    return <tr><td className="tdBulkUpload"><p className="bulkUploadContent">Batch Id# {m.BATCH_ID}, upload date {m.UploadDate}, by {m.UpdatedBy} </p></td>
                        <td className="tdBulkUpload"><button type="button" class="btn btn-primary btn-sm btn-publish" onClick={this.Publish.bind(this, m.BATCH_ID)}>Publish to Live</button></td>
                    </tr>
                })
            })
        }).catch(err => { console.log(err) });
}

export function publishBulkUpload() {
    console.log(this.publishToLiveData);
    axios.post(API.publishBulkUpload, this.publishToLiveData)
        .then(result => {
            getBulkUploadDetails.call(this);
            alert('Success')
        })
        .catch(err => { console.log(err) });
}
