import axios from 'axios';
import React from 'react';
import * as API from '../utils/endpoints';
import * as StoreData from '../../src/store/api_store';

export function BulkUpload() {
    axios.post(API.bulkUpload, this.uploadExcelDetails)
        .then(result => {
            bulkUploadDetail.call(this);
            this.props.dispatch(StoreData.UniqueContent(this.props.storeData._userMarkets
                .map(m => { return m.MarketCode }).join(',').toString()));
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
