import axios from 'axios';
import * as API from '../utils/endpoints';

export function SendNotification() {
    console.log(this.newlyCreatedPageDetails);
    axios.post(API.sendEmail, this.newlyCreatedPageDetails)
        .then(result => {
            this.sucessMessage = true;
            this.setState({});
        })
        .catch(err => { console.log(err) });
}

export function checkNewlyCreatePage() {
    axios.get(API.getNewlyCreatedPages)
        .then(result => {
            console.log(result.data);
            this.newlyCreatedPages = result.data;
        })
        .catch(err => { console.log(err) });
}

export function publishToLive() {
    axios.get(API.publishToLive)
        .then(result => {
            this.sucessMessage = true;
            this.setState({});
        })
        .catch(err => { console.log(err) });
}
