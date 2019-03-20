import axios from 'axios';
import * as API from '../utils/endpoints';
import * as StoreData from '../../src/store/api_store';

export function BulkUpload() {
    axios.post(API.bulkUpload, this.uploadExcelDetails)
        .then(result => {
            console.log(result);
            this.props.dispatch(StoreData.UniqueContent(this.props.storeData._userMarkets
                .map(m => { return m.MarketCode }).join(',').toString()));
            alert('File is uploaded sucessfully')
        }).catch(err => { console.log(err) });
}