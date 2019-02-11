import axios from 'axios';
import * as API from '../utils/endpoints';

export function BulkUpload() {
    axios.post(API.bulkUpload, this.uploadExcelDetails)
    .then(result => {
        alert('File is uploaded sucessfully')
        console.log(result);
       // saveBatchDetails.call(this);
    }).catch(err => { console.log(err) });
}