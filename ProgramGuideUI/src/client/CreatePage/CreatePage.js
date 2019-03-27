import React, { Component } from 'react';
import * as API from '../../api/SearchResults';
import * as Constant from '../../utils/constant';

import EditContent from '../PageEditor/PageEditor';

import './styles.css';

import { connect } from 'react-redux';
import * as StoreData from '../../store/api_store';

class CreatePage extends Component {

  constructor() {
    super();
    this.errorMessage = '';
    this.state = {
      refreshPage: false,
      showContentEditorModal: false
    }
  }

  componentDidMount() {
    !this.props.storeData._createPageTags
      ? this.props.dispatch(StoreData.CreatePageTags.call(this))
      : '';
  }

  editorContentData = (value) => {
    if (value) {
      this.refs.ParentPageUrl.value = '';
      this.setState({ showContentEditorModal: !this.state.showContentEditorModal })
    }
  }

  createNewPage() {
    this.PageUrl = this.refs.ParentPageUrl.value;
    var isValidUrl = !/\s/.test(this.PageUrl) && /^\//.test(this.PageUrl) && this.PageUrl.endsWith('/');


    this.errorMessage = !isValidUrl // Check if it's valid page url
      ? Constant.ERROR_INVALID_PAGEURL
      : !this.props.storeData._selectedMarket // Check if market is selected
        ? Constant.ERROR_SELECT_MARKET
        : this.props.storeData._uniqueContentData
          .filter(m => m.MarketCode === this.props.storeData._selectedMarket && m.PageUrl === this.PageUrl).length > 0 // Check if page alread exist for the selected market
          ? Constant.ERROR_PAGEURL_EXIST
          : Constant.EMPTY_STRING;

    this.setState(!this.errorMessage ? { showContentEditorModal: !this.state.showContentEditorModal } : { refreshPage: true });
  }

  render() {
    console.log(this.props);
    return (
      <div className="itemDiv create-page">
        <div className="container">
          <h3> Create Page URL: </h3>
          <div className="row">
            <div className="col-sm-12">
              <div className="input-group input-group-sm">
                <input type="text" className="form-control create-input" ref="ParentPageUrl" placeholder="Enter URL" required />
                <span className="input-group-btn">
                  <button className="btn btn-primary btn-modal" type="submit" onClick={this.createNewPage.bind(this)}>Create Page</button>
                </span>
              </div>
              <br />

              {this.state.showContentEditorModal ? <EditContent uniqueResult={this.props.storeData._uniqueContentData
                .filter(m => m.MarketCode === this.props.storeData._selectedMarket)}
                isNewPage={true} PageUrl={this.PageUrl}
                getEditorContentData={this.editorContentData.bind(this)} /> : ''}

              {this.errorMessage
                ? <div className="alert alert-danger" role="alert">
                  <p>{this.errorMessage}</p>
                </div>
                : ''}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default connect((state, props) => { return { storeData: state } })(CreatePage);
