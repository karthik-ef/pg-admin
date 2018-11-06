import React, { Component } from 'react';
import $ from 'jquery';
import Tree from './CustomControls/TreeView';

var pageHierarchyData = { name: '/pg/', toggled: true }
var ChildrenPageDetails = [];
var rootPageID;

class PageHierarchy extends Component {

  constructor() {
    super();
    this.state = {}
  }
  Filter = (value) => {
console.log(value)
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

  render() {
    console.log(this.state.uniqueContentData);
    console.log(rootPageID);
    if (this.state.uniqueContentData !== undefined) {
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
        <Tree setData={pageHierarchyData} CallBack={this.Filter.bind(this)} />
      </div>
    );
  }
}

export default PageHierarchy;
