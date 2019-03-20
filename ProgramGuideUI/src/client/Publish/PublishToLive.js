import React from 'react';
import Component from '../../Routes';
import * as Path from '../../utils/routepath';
import * as API from '../../api/Publish';
import { connect } from 'react-redux';

class Content extends React.Component {

    componentDidMount() {
        this.sucessMessage = false;
        API.checkNewlyCreatePage.call(this);
    }

    publishToLive() {

        API.publishToLive.call(this);
        //Check if any news pages are created after the last publish
        if (this.newlyCreatedPages.length > 0) {
            this.newlyCreatedPageDetails = {};
            this.newlyCreatedPageDetails.toAddress = 'karthik.subbarayappa@ef.com, Hao.peng@ef.com';
            this.newlyCreatedPageDetails.pageDetails = this.newlyCreatedPages;

            //Send email notification to the users
            API.SendNotification.call(this);
        }
    }

    render() {

        // console.log(this.props.storeData._userDashboardData
        //     .filter(m => ['VE'].includes(m.MarketCode))
        //     .map(m => {return m.UserName + '@ef.com'}).toString());
        return (
            <div className="itemDiv add-users__wrapper">
                <div className="container">
                    {this.sucessMessage
                        ? <div className="alert alert-success" role="alert">
                            <p>Changes are successfully publish to live. It may take few minutes to refresh the database.</p>
                        </div>
                        :
                        <div className="container">
                            {this.props.storeData._loginDetails.userName.toString().toLowerCase() === 'hao.peng' ||
                                this.props.storeData._loginDetails.userName.toString().toLowerCase() === 'ruobing.ai'
                                ? <button className="btn btn-primary" type="button" onClick={this.publishToLive.bind(this)}>Publish All</button>
                                : ''}
                        </div>
                    }
                </div>
            </div>
        );
    }
}

export default connect((state, props) => { return { storeData: state } })(Content);
