import React, { Component } from 'react';
import DropDown from '../CustomControls/DropDown';
import './SitemapGenerator.css';
import * as API from '../../api/SitemapGenerator';

class SitemapGenerator extends Component {

  componentDidMount() {
    API.getSitemapWebsites.call(this);
  }

  selectedTagValue = (value) => {
    this.selectedWebsite = value;
  }

  bindedMarketValue = (value) => {
    this.selectedMarket = value;
  }

  runSitemapGenerator = (value) => {
    this.XMLData = [];
    API.getSitemapAllPages.call(this);
  }

  render() {
    console.log(this.marketsData);
    console.log(this.sitemapWebsiteDetails);
    return (
      <div className="itemDiv add-users__wrapper">
        <div className="container">
          <div><strong>Sitemap Generator</strong></div>
          <br />
          <div class="input-group input-group-sm" >
            <div class="col-md-4">
              <label for="exampleInputEmail1"><strong>Website</strong></label>
              <DropDown Websites = {this.websiteData} bindedValue={this.selectedTagValue.bind(this)}/>
            </div>
            <div class="col-md-4">
              <label for="exampleInputEmail1"><strong>Markets</strong></label>
              <DropDown Markets= {this.marketsData} bindedMarketValue={this.bindedMarketValue.bind(this)}/>
            </div>
            <div class="col-md-4">
              <div className="runSitemap_wrapper">
                <button class="btn btn-primary btn-modal" type="submit" onClick={this.runSitemapGenerator.bind(this)} >Run Sitemap </button>
              </div>
            </div>
          </div>
        </div >
      </div>

    );
  }
}

export default SitemapGenerator;
