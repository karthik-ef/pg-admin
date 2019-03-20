import React, { Component } from 'react';
import $ from 'jquery';
import Tree from '../CustomControls/TreeView';
import EditContent from '../PageEditor/PageEditor';
import * as Constant from '../../utils/constant';
import Loader from '../CustomControls/LoadingScreen';
import { connect } from 'react-redux';

import './hierarchy.css';

var ChildrenPageDetails = [];
var rootPageID;

class PageHierarchy extends Component {

  constructor() {
    super();
    this.state = { showEditContentModal: false }
    this.EditPageRow = [];
    this.Flag = true;
    this.uniqueContentData = []
  }

  Filter = (value) => {
    console.log(value)
    if (!value['toggled']) {
      var objContent = {};
      objContent.UniqueContentData = this.uniqueContentData;
      objContent.EditRowData = this.uniqueContentData.filter(m => m.UniqueContent_ID === value['value'])[0];
      this.EditPageRow = objContent;
      this.Flag = false
      this.setState({ showEditContentModal: true })
    }
  }

  MultipleLevelRecursive(a) {
    if (this.uniqueContentData.filter(m => m.ParentPageID === a).length === 0) {
      return null;
    }
    else {
      var data = this.uniqueContentData.filter(m => m.ParentPageID === a).map(m => { return { name: m.PageUrl, value: m.UniqueContent_ID, children: this.MultipleLevelRecursive(m.UniqueContent_ID) } })
      return data;
    }
  }

  FirstLevelRecursive(a) {
    console.log(a);
    ChildrenPageDetails.push({ name: a.PageUrl, value: a.UniqueContent_ID, children: this.MultipleLevelRecursive(a.UniqueContent_ID) });
  }

  editorContentData = (value) => {
    if (value === true) {
      this.setState({ showEditContentModal: !this.state.showEditContentModal });
    }
    else if (value === 'closed') {
      this.setState({ showEditContentModal: !this.state.showEditContentModal });
    }
  }

  render() {
    this.uniqueContentData = this.props.storeData._selectedMarket
      ? this.props.storeData._uniqueContentData.filter(m => m.MarketCode === this.props.storeData._selectedMarket)
      : [];
    if (this.uniqueContentData !== undefined && this.Flag) {
      this.pageHierarchyData = {};
      ChildrenPageDetails = [];
      rootPageID = this.uniqueContentData.filter(m => m.ParentPageID === 0).map(m => { return m.UniqueContent_ID });
      this.pageHierarchyData.name = this.uniqueContentData.filter(m => m.ParentPageID === 0 && m.PageUrl === '/pg/').map(m => { return m.PageUrl })[0];
      this.pageHierarchyData.value = this.uniqueContentData.filter(m => m.ParentPageID === 0 && m.PageUrl === '/pg/').map(m => { return m.UniqueContent_ID })[0];
      this.uniqueContentData.filter(m => m.ParentPageID === rootPageID[0]).map(m => {
        var v = {};
        v.PageUrl = m.PageUrl;
        v.UniqueContent_ID = m.UniqueContent_ID;
        this.FirstLevelRecursive(v)
        this.pageHierarchyData.children = ChildrenPageDetails;
      })
    }

    return (
      !this.props.storeData._selectedMarket
        ? <div className="container">
          <div className="alert alert-danger" role="alert">
            <p>{Constant.ERROR_SELECT_MARKET}</p>
          </div>
        </div>
        : this.uniqueContentData.length > 0
          ? <div className="itemDiv hierarchy__wrapper container">
            {this.state.showEditContentModal ? <EditContent getEditorContentData={this.editorContentData.bind(this)} EditPageRow={this.EditPageRow} /> : ''}
            <Tree setData={this.pageHierarchyData} CallBack={this.Filter.bind(this)} />
          </div>
          : <Loader />
    );
  }
}


export default connect((state, props) => { return { storeData: state } })(PageHierarchy);
