import React, { Component } from 'react';
import $ from 'jquery';
import EditContent from './SearchResult/EditContent';

var PageUrl = '';

class CreatePage extends Component {

  constructor() {
    super(); this.CreatePage = this.CreatePage.bind(this);
    this.state = {
      uniqueResult: [],
      showModal: false,
      showErrorMessage: false 
    }
  }

  componentDidMount(){
    this.getUniqueContentData();
  }

  getUniqueContentData() {
    $.ajax({
      url: 'http://localhost:3001/getUniqueContentResults/?marketCode=es',
      type: 'GET',
      cache: false,
      success: function (data) {
        this.setState({ uniqueResult: data });
      }.bind(this),
      error: function (xhr, status, err) {
        console.log(err);
      }
    });

  }

  CreatePage(e) {
    this.PageUrl = this.refs.ParentPageUrl.value;
    if (!this.state.uniqueResult.filter(m => m.PageUrl === this.PageUrl).length > 0) {
      this.setState({ showErrorMessage: false, showModal: true });
    }
    else {
      this.setState({ showErrorMessage: true });
    }
    e.preventDefault();
  }

  dataFromEditContent = (value) => {
    if (value) {
      this.setState({ showModal: !this.state.showModal })
    }
  }

  render() {
    return (
      <div className="itemDiv">
        {this.state.showModal ? <EditContent PageUrl = {this.PageUrl} callbackFromEditContent={this.dataFromEditContent} /> : ''}
        <strong> Create Page URL: </strong>
        <br />
        <div class="row">
          <div class="col-sm-12">
          <form onSubmit={this.CreatePage.bind(this)}>
            <div class="input-group input-group-sm">
              <input type="text" class="form-control input-sm" ref="ParentPageUrl" required />
              <span class="input-group-btn">
                <button class="btn btn-primary btn-sm" type="submit" >Create Page</button>
              </span>
            </div>
            </form>
            <br />
            {this.state.showErrorMessage ? <div class="alert alert-danger" role="alert">
              Page URL - <strong>{this.PageUrl}</strong> for Market <strong>ES</strong> already exisit! Please choose different URL or Market
          </div> : ''}
            
          </div>
        </div>
      </div>
    );
  }
}

export default CreatePage;
