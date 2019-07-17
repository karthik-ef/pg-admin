import React, { Component } from 'react';
import DropDown from '../CustomControls/DropDown';
import './SitemapGenerator.css';
import * as StoreData from '../../store/api_store';
import * as API from '../../api/SitemapGenerator';
import { connect } from 'react-redux';

class SitemapGenerator extends Component {

  constructor() {
    super();
  }

  componentDidMount() {
    //API.getHreflangMappingDetails.call(this);
    this.props.storeData._sitemapWebsites
      ? ''
      : this.props.dispatch(StoreData.SitemapWebsites.call(this));
  }

  selectedTagValue = (value) => {
    this.selectedWebsite = value;
  }

  BindMarkets = (value) => {
    this.Markets = value;
  }

  async runSitemapGenerator() {
    //Set error message
    this.ErrorMessage = !this.selectedWebsite
      ? "Please select webiste."
      : !this.Markets
        ? "Please select a market"
        : ''

    //Display the error message
    if (this.ErrorMessage) {
      this.setState({});
      return
    }
    else { // Generate sitemap for selected website and market(s)
      this.props.dispatch({ type: 'store_SitemapExecutionStatus', data: true });

      for (const item of this.Markets.split(',')) {
        this.selectedMarket = item;
        this.xmlFileName = 'sitemap-' + this.selectedWebsite.replace('/', '').toLowerCase() + '-' + this.selectedMarket.toLowerCase() + '.xml';
        //Check the type of website
        var websiteType = this.props.storeData._sitemapWebsites
          .filter(m => m.WebsiteName === this.selectedWebsite)
          .map(m => { return m.WebsiteCategory }).toString()

          console.log(websiteType);
        websiteType === 'Product'
          ? await API.getSitemapSearchPages.call(this)
          : websiteType === 'PG'
            ? await API.getPGPages.call(this)
            : await API.getSitemapMinisites.call(this)



        this.setState({});
      }
      this.selectedWebsite = '';
      this.Markets = '';
      this.props.dispatch({ type: 'store_SitemapExecutionStatus', data: false });
    }
  }

  render() {
    return (
      <div className="itemDiv add-users__wrapper">
        <div className="container">
          <div><strong>Sitemap Generator</strong></div>
          <br />
          {this.ErrorMessage
            ?
            <div className="alert alert-danger" role="alert">
              <p>{this.ErrorMessage}</p>
            </div>
            : ''
          }
          {this.props.storeData._isSitemapExecuting
            ?
            <div className="alert alert-info" role="alert">
              <span className="alert-text__info strong__text">We are processing your request to generate the sitemap now, it may take a few minutes. Please come back later.</span> <br />
            </div>
            :
            <div>
              <div class="input-group input-group-sm" >
                <div class="col-md-4">
                  <label for="exampleInputEmail1"><strong>Website</strong></label>
                  <DropDown Websites={this.props.storeData._sitemapWebsites
                    ? this.props.storeData._sitemapWebsites
                      .map(m => { return { label: m.WebsiteName, value: m.WebsiteName } })
                    : []
                  }
                    bindedValue={this.selectedTagValue.bind(this)} />
                </div>
                <div class="col-md-4">
                  <label for="exampleInputEmail1"><strong>Markets</strong></label>
                  <DropDown
                    Markets={this.props.storeData._sitemapMarkets
                      ? this.props.storeData._sitemapMarkets.map(m => { return { label: m.MarketName, value: m.MarketCode } })
                      : []
                    }
                    multiSelect={true}
                    bindedMarketValue={this.BindMarkets.bind(this)}
                  />
                </div>
                <div class="col-md-4">
                  <div className="runSitemap_wrapper">
                    <button class="btn btn-primary btn-modal" type="submit" onClick={this.runSitemapGenerator.bind(this)} >Run Sitemap </button>
                  </div>
                </div>
              </div>
            </div>
          }
        </div >
      </div>

    );
  }
}

export default connect((state, props) => { return { storeData: state } })(SitemapGenerator);
