import axios from 'axios';
import React from 'react';
import * as API from '../utils/endPoint';
import * as Constant from '../utils/constant';

export function getBulkUploadDetails() {
    axios.get(API.BULK_UPLOAD_DETAILS + JSON.parse(localStorage.getItem('Login'))['UserName'])
        .then(result => {
            this.setState({
                bulkUploadDetailsData: result.data.map(m => {
                    return <tr><td className="tdBulkUpload"><p className="bulkUploadContent">Batch Id# {m.BATCH_ID}, upload date {m.UploadDate}, by {m.UpdatedBy} </p></td>
                        <td className="tdBulkUpload"><button type="button" class="btn btn-primary btn-small btn-publish">Publish to Live</button></td>
                    </tr>
                })
            })
        }).catch(err => { console.log(err) });
}

function saveBatchDetails() {
    axios.post(API.UPLOAD_BATCH_DETAILS, this.BulkUploadDetails)
        .then(result => {
            getBulkUploadDetails.call(this);
            this.setState({fileName: Constant.NO_FILE_CHOSEN});
            alert('Excel uploaded successfully');
        }).catch(err => { console.log(err) });
}

export function uploadExcelData() {
    axios.post(API.UPLOAD_EXCEL_FILE, this.uploadExcelDetails)
        .then(result => {
            console.log(result);
            saveBatchDetails.call(this);
        }).catch(err => { console.log(err) });
}