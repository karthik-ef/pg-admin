import React from 'react';
import Component from '../../Routes';
import * as Path from '../../utils/routepath';
import * as API from '../../api/Publish';
import { connect } from 'react-redux';
import * as Constant from '../../utils/constant';
import * as Store from '../../store/api_store';

class Content extends React.Component {

    constructor() {
        super();
        this.gridData = [];
        this.currentMarket = '';
    }

    componentDidMount() {
        this.sucessMessage = false;
        //API.checkNewlyCreatePage.call(this);
        this.props.dispatch(Store.NewPages.call(this));
    }

    publishToLive() {
        //Check if any news pages are created after the last publish
        if (this.props.storeData._newPagesDetails.length > 0) {
            this.newlyCreatedPageDetails = {
                toAddress: 'karthik.subbarayappa@ef.com',
                pageDetails: this.props.storeData._newPagesDetails
            };
            //Send email notification to the users
            API.SendNotification.call(this);
        }

        // API.publishToLive.call(this);
        //Check if any news pages are created after the last publish
        // if (this.newlyCreatedPages.length > 0) {
        //     this.newlyCreatedPageDetails = {};
        //     this.newlyCreatedPageDetails.toAddress = 'karthik.subbarayappa@ef.com';
        //     this.newlyCreatedPageDetails.pageDetails = this.newlyCreatedPages;

        //     //Send email notification to the users
        //     // API.SendNotification.call(this);
        // }
    }

    render() {

        return (
            < div className="itemDiv add-users__wrapper" >
                <div className="container">
                    {this.sucessMessage //Display success message after publishing the data
                        ? <div className="alert alert-success" role="alert">
                            <p>Changes are successfully publish to live. It may take few minutes to refresh the database.</p>
                        </div>
                        : <button className="btn btn-primary" type="button" onClick={this.publishToLive.bind(this)}>Publish to LIVE</button>
                    }
                </div>
            </div>
        )
    }
}

export default connect((state, props) => { return { storeData: state } })(Content);
