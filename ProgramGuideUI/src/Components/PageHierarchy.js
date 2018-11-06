import React, { Component } from 'react';
import $ from 'jquery';
import Tree from './CustomControls/TreeView';
import EditContent from './PageEditor/PageEditor';
var pageHierarchyData = { name: '/pg/', toggled: true }
var ChildrenPageDetails = [];
var rootPageID;

class PageHierarchy extends Component {

  constructor() {
    super();
    this.state = { showEditContentModal: false }
    this.EditPageRow = [];
    this.Flag = true;
  }
  Filter = (value) => {
    console.log(value['toggled'])
    if (!value['toggled']) {
      var objContent = {};
      objContent.UniqueContentData = this.state.uniqueContentData;
      objContent.EditRowData = this.state.uniqueContentData.filter(m => m.UniqueContent_ID === value['value'])[0];
      this.EditPageRow = objContent;
      this.Flag = false
      this.setState({ showEditContentModal: true })
    }
  }

  MultipleLevelRecursive(a) {
    var data = this.state.uniqueContentData.filter(m => m.ParentPageID === a).map(m => { return { name: m.PageUrl, value: m.UniqueContent_ID, children: this.MultipleLevelRecursive(m.UniqueContent_ID) } })
    return data;
  }

  FirstLevelRecursive(a) {
    ChildrenPageDetails.push({ name: a.PageUrl, value: a.UniqueContent_ID, children: this.MultipleLevelRecursive(a.UniqueContent_ID) });
  }

  getUniqueContentData() {
    $.ajax({
      url: 'http://ctdev.ef.com:3000/getUniqueContentResults/?marketCode=' + localStorage.getItem('Market'),
      type: 'GET',
      cache: false,
      success: function (data) {
        rootPageID = data.filter(m => m.ParentPageID === 0).map(m => { return m.UniqueContent_ID });
        this.setState({ uniqueContentData: data });
      }.bind(this),
      error: function (xhr, status, err) {
        console.log(err);
      }
    });
  }

  componentDidMount() {
    this.getUniqueContentData();
  }

  dataFromEditContent = (value) => {
    if (value === true) {
      this.setState({ showEditContentModal: !this.state.showEditContentModal });
    }
    else if (value === 'closed') {
      this.setState({ showEditContentModal: !this.state.showEditContentModal });
    }
  }

  render() {
    console.log(this.EditPageRow)
    if (this.state.uniqueContentData !== undefined && this.Flag) {
      this.state.uniqueContentData.filter(m => m.ParentPageID === rootPageID[0]).map(m => {
        var v = {};
        v.PageUrl = m.PageUrl;
        v.UniqueContent_ID = m.UniqueContent_ID;
        this.FirstLevelRecursive(v)
        pageHierarchyData.children = ChildrenPageDetails;
      })
    }
    return (
      <div className="itemDiv">
        {this.state.showEditContentModal ? <EditContent callbackFromEditContent={this.dataFromEditContent} EditPageRow={this.EditPageRow} /> : ''}
        <Tree setData={pageHierarchyData} CallBack={this.Filter.bind(this)} />
      </div>
    );
  }
}

export default PageHierarchy;
