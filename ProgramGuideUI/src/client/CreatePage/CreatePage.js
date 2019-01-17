import React, { Component } from 'react';
import * as API from '../../server/Api';
import * as Constant from '../../utils/constant';

import EditContent from '../PageEditor/PageEditor';

import './styles.css';

class CreatePage extends Component {

  constructor() {
    super();
    this.errorMessage = '';
    this.state = {
      refreshPage: false,
      showContentEditorModal : false
    }
  }

  componentDidMount() {
    API.GetUniqueContentData.call(this);
  }


  editorContentData = (value) => {
    if (value) {
      API.GetUniqueContentData.call(this);
      this.refs.ParentPageUrl.value = '';
      this.setState({ showContentEditorModal: !this.state.showContentEditorModal })
    }
}

  createNewPage() {
    this.PageUrl = this.refs.ParentPageUrl.value;
    console.log(this.PageUrls);
    var validate = !/\s/.test(this.PageUrl) && /^\//.test(this.PageUrl) && this.PageUrl.endsWith('/');

    if (localStorage.getItem('Market') === null || localStorage.getItem('Market') === '' || localStorage.getItem('Market') === 'select') {
      this.errorMessage = Constant.ERROR_SELECT_MARKET;
    }
    else if (!validate) {
      this.errorMessage = Constant.ERROR_INVALID_PAGEURL;
    }
    else if (this.PageUrls.filter(m => m.name === this.PageUrl).length > 0) {
      this.errorMessage = Constant.ERROR_PAGEURL_EXIST;
    }
    else {
      this.errorMessage = '';
      this.setState({ showContentEditorModal: !this.state.showContentEditorModal })
    }
    this.setState({ refreshPage: true });
  }

  render() {
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

              {this.state.showContentEditorModal ? <EditContent uniqueResult = {this.state.uniqueContentData} isNewPage = {true} PageUrl={this.PageUrl} getEditorContentData={this.editorContentData.bind(this)} /> : ''}


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

export default CreatePage;
