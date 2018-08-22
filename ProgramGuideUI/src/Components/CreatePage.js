import React, { Component } from 'react';
import $ from 'jquery';
import EditContent from './SearchResult/EditContent';

var PageUrl = '';

class CreatePage extends Component {

  constructor() {
    super();
    this.CreatePage = this.CreatePage.bind(this);
    this.OnBlur = this.OnBlur.bind(this);
    this.state = {
      uniqueResult: [],
      showModal: false,
      showErrorMessage: false,
      showValidationError: false
    }
  }

  componentDidMount() {
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
    // this.PageUrl = this.refs.ParentPageUrl.value;
    // alert(this.PageUrl);
    // if (!this.state.uniqueResult.filter(m => m.PageUrl === this.PageUrl).length > 0) {
    //   this.setState({ showErrorMessage: false, showModal: true });
    // }
    // else {
    //   this.setState({ showErrorMessage: true });
    // }
    // e.preventDefault();
  }

  dataFromEditContent = (value) => {
    if (value) {
      this.setState({ showModal: !this.state.showModal })
    }
  }

  OnBlur() {
    this.PageUrl = this.refs.ParentPageUrl.value;
    var validate = !/\s/.test(this.refs.ParentPageUrl.value) && /^\//.test(this.refs.ParentPageUrl.value) && this.refs.ParentPageUrl.value.endsWith('/');
    if (!validate) {
      this.setState({ showValidationError: true, showErrorMessage: false, showModal: false });
    }
    else if(this.state.uniqueResult.filter(m => m.PageUrl === this.PageUrl).length > 0){
      this.setState({ showValidationError: false, showErrorMessage: true, showModal: false });
    }
    else {
      this.setState({ showValidationError: false, showErrorMessage: false, showModal: true });
    }

    //var t = validate.toString().matches("\\s");
    // console.log(/\s/.test(validate));
  }

  render() {
    return (
      <div className="itemDiv">
        {this.state.showModal ? <EditContent PageUrl={this.PageUrl} callbackFromEditContent={this.dataFromEditContent} /> : ''}
        <strong> Create Page URL: </strong>
        <br />
        <div class="row">
          <div class="col-sm-12">
              <div class="input-group input-group-sm">
                <input type="text" class="form-control input-sm" onBlur={this.OnBlur} ref="ParentPageUrl" required />
                <span class="input-group-btn">
                  <button class="btn btn-primary btn-sm" type="submit" >Create Page</button>
                </span>
              </div>
            <br />
            {this.state.showErrorMessage ? <div class="alert alert-danger" role="alert">
              Page URL - <strong>{this.PageUrl}</strong> for Market <strong>ES</strong> already exisit! Please choose different URL or Market
          </div> : ''}

            {this.state.showValidationError ? <div class="alert alert-danger" role="alert">
              Please provide Valid Page URL
          </div> : ''}

          </div>
        </div>
      </div>
    );
  }
}

export default CreatePage;
