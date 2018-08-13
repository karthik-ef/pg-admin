import React, { Component } from 'react';
import EditContent from './SearchResult/EditContent';

class CreatePage extends Component {

  constructor() {
    super();this.CreatePage = this.CreatePage.bind(this);
    this.state = {
      showModal: false
    }
  }

  CreatePage() {
    this.setState({ showModal: true });
  }

  dataFromEditContent = (value) => {
    if (value){
        this.setState({showModal: !this.state.showModal})
    }
}

  render() {
    return (
      <div className="itemDiv">
        {this.state.showModal ? <EditContent callbackFromEditContent={this.dataFromEditContent} /> : ''}
        <strong> Create Page URL: </strong>
        <br />
        <div class="row">
          <div class="col-sm-12">
            <div class="input-group input-group-sm">
              <input type="text" class="form-control input-sm" id="search-church" ref="ParentPageUrl"
                defaultValue='' required />
              <span class="input-group-btn">
                <button class="btn btn-primary btn-sm" type="submit" onClick={this.CreatePage}>Create Page</button>
              </span>
            </div>
            <br />
            <div class="alert alert-danger" role="alert">
              Page URL - <strong>/pg/</strong> for Market <strong>ES</strong> already exisit! Please choose different URL or Market
          </div>
          </div>
        </div>
      </div>
    );
  }
}

export default CreatePage;
