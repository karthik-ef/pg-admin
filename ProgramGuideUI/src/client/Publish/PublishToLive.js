import React from 'react';
import Component from '../../Routes';
import * as Path from '../../utils/routepath';
import * as API from '../../api/Publish';
import { connect } from 'react-redux';
import Grid from '../CustomControls/Grid';
import * as Constant from '../../utils/constant';

class Content extends React.Component {

    constructor() {
        super();
        this.gridData = [];
        this.currentMarket = '';
    }

    componentDidMount() {
        this.sucessMessage = false;
        API.checkNewlyCreatePage.call(this);
    }

    publishToLive() {

        // API.publishToLive.call(this);
        //Check if any news pages are created after the last publish
        if (this.newlyCreatedPages.length > 0) {
            this.newlyCreatedPageDetails = {};
            this.newlyCreatedPageDetails.toAddress = 'karthik.subbarayappa@ef.com, Hao.peng@ef.com';
            this.newlyCreatedPageDetails.pageDetails = this.newlyCreatedPages;

            //Send email notification to the users
            // API.SendNotification.call(this);
        }
    }

    DeletedPages(page) {
        this.gridData = this.gridData.filter(m => m.UniqueContent_ID !== page.UniqueContent_ID);
        this.setState({});
    }

    render() {
        console.log(this.props.storeData._loginDetails.roleName);
        console.log(this.gridData = this.props.storeData._uniqueContentData.filter(m => m.UpdateBy === this.props.storeData._loginDetails.userName && m.MarketCode === this.props.storeData._selectedMarket));

        this.gridData.length === 0 || this.currentMarket !== this.props.storeData._selectedMarket
            ? this.props.storeData._loginDetails.roleName === 'Admin' // Publish Data for Admin Users
                ? this.gridData = this.props.storeData._uniqueContentData.filter(m => m.MarketCode === this.props.storeData._selectedMarket)
                : this.props.storeData._loginDetails.roleName === 'General' // Publish Data for General Users
                    ? this.gridData = this.props.storeData._uniqueContentData.filter(m => m.UpdateBy === this.props.storeData._loginDetails.userName && m.MarketCode === this.props.storeData._selectedMarket)
                    : this.props.storeData._loginDetails.roleName === 'Power' // Publish Data for Power Users
                        ? this.gridData = this.props.storeData._uniqueContentData.filter(m => m.MarketCode === this.props.storeData._selectedMarket)
                        : ''
            : ''

        this.currentMarket = this.props.storeData._selectedMarket;

        return (
            <div className="itemDiv add-users__wrapper">
                <div className="container">
                    {this.sucessMessage //Display success message after publishing the data
                        ? <div className="alert alert-success" role="alert">
                            <p>Changes are successfully publish to live. It may take few minutes to refresh the database.</p>
                        </div>
                        : !this.props.storeData._selectedMarket //Check if market is selected
                            ? <div className="itemDiv search__results--wrapper">
                                <div className="container">
                                    <div className="alert alert-danger" role="alert">
                                        <p>{Constant.ERROR_SELECT_MARKET}</p>
                                    </div>
                                </div>
                            </div>
                            : <div className="container">
                                {this.gridData.length === 0
                                    ? <div className="alert alert-danger" role="alert">
                                        <p>No Data available to publish.</p>
                                    </div>
                                    : <div>
                                        <div className="alert alert-info" role="alert">
                                            <p className="alert-text__info strong__text"> {this.gridData.length} pages will be published to LIVE. </p>
                                        </div>
                                        <br />
                                        {this.props.storeData._loginDetails.userName.toString().toLowerCase() === 'hao.peng' ||
                                            this.props.storeData._loginDetails.userName.toString().toLowerCase() === 'ruobing.ai'
                                            ? <button className="btn btn-primary" type="button" onClick={this.publishToLive.bind(this)}>Publish All</button>
                                            : ''}
                                        <Grid DeletedRow={this.DeletedPages.bind(this)} setData={this.gridData} />
                                        {/* <button className="btn btn-primary" type="button" onClick={this.publishToLive.bind(this)}>Publish to LIVE</button> */}
                                    </div>
                                }
                            </div>
                    }
                </div>
            </div >
        );
    }
}

export default connect((state, props) => { return { storeData: state } })(Content);
