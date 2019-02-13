import React, { Component } from 'react';
import DropDown from '../CustomControls/DropDown';
import './SitemapGenerator.css';

class SitemapGenerator extends Component {
  render() {

    return (
      <div className="itemDiv add-users__wrapper">
        <div className="container">
          <div><strong>Sitemap Generator</strong></div>
          <br />
          <div class="input-group input-group-sm" >
            <div class="col-md-4">
              <label for="exampleInputEmail1"><strong>Website</strong></label>
              <DropDown />
            </div>
            <div class="col-md-4">
              <label for="exampleInputEmail1"><strong>Markets</strong></label>
              <DropDown />
            </div>
            <div class="col-md-4">
              <div className="runSitemap_wrapper">
                <button class="btn btn-primary btn-modal" type="submit" >Run Sitemap </button>
              </div>
            </div>
          </div>
        </div >
      </div>

    );
  }
}

export default SitemapGenerator;
