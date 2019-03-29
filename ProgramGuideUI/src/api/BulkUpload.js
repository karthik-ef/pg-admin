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
            this.setState({
                bulkUploadDetailsData: result.data.map(m => {
                    return <tr><td className="tdBulkUpload"><p className="bulkUploadContent">Batch Id# {m.BATCH_ID}, upload date {m.UploadDate}, by {m.UpdatedBy} </p></td>
                        <td className="tdBulkUpload"><button type="button" class="btn btn-primary btn-sm btn-publish">Publish to Live</button></td>
                    </tr>
                })
            })
        }).catch(err => { console.log(err) });
}