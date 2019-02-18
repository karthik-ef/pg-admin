import axios from 'axios';
import * as API from '../utils/endpoints';
import { saveAs } from 'file-saver';
import moment from 'moment';
import xmlFormat from 'xml-formatter';

export function getSitemapWebsites() {
  axios.get(API.getSitemapWebsites)
    .then(result => {
      console.log(result.data);
      this.sitemapWebsiteDetails = result.data;
      this.websiteData = this.sitemapWebsiteDetails.map(m => { return { label: m.WebsiteName, value: m.WebsiteName } });
      getMarkets.call(this);

    }).catch(err => { console.log(err) });
}

function getMarkets() {
  axios.get(API.getUserMarkets + JSON.parse(localStorage.getItem('UserName')))
    .then(result => {
      this.marketsData = result.data.map(m => { return { label: m.MarketCode, value: m.MarketCode } });
      this.setState({});
    })
    .catch(err => { console.log(err) });
}

export function getSitemapAllPages() {
  axios.get(API.getSitemapAllPages + this.selectedMarket + "&pageUrl=" + this.selectedWebsite)
    .then(result => {
      this.Row =  result.data.length;
      result.data.forEach((element, index) => {
        this.Row = index;
          this.siteMapPageUrl = element.PageUrl;
          this.xmlFileName = 'sitemap-' + this.selectedWebsite.replace('/', '').toLowerCase() + '-' + this.selectedMarket.toLowerCase() + '.xml';
          getPageDatabase_SearchPages.call(this)
      });
    })
    .catch(err => {
      console.log(err);
    })
}

function getPageDatabase_SearchPages() {
  axios.get(API.getPageDatabase_SearchPages + this.siteMapPageUrl)
    .then(result => {
      console.log(result.data);
      this.XMLData.push({ [result.data.map(m => { return m.PageUrl })[0]]: result.data });
      console.log('-----------------------------');
      console.log(this.XMLData.length);
      console.log(this.Row);
      if (this.XMLData.length ===  this.Row) {
        this.siteMapXmlData = [];
        var rootXMLOpen = '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">';
        var rootXMLClose = '</urlset>';
        var xmlUrlOpen = '<url>';
        var xmlUrlClose = '</url>';
        var xmlLocOpen = '<loc>https://www.ef.co.';
        var xmlLocClose = '</loc>';
        var xmlLastmodOpen = '<lastmod>';
        var xmlLastmodClose = '</lastmod>';
        var xmlPriorityOpen = '<priority>'
        var xmlPriorityClose = '</priority>'

        this.XMLData.forEach(element => {
          var priority = Object.keys(element).toString().replace(/\//g, '').toLowerCase() === this.selectedWebsite.replace(/\//g, '').toLowerCase() ? '1' : '0.5';
          this.siteMapXmlData.push(
            xmlUrlOpen + xmlLocOpen + this.selectedMarket.toLowerCase() + Object.keys(element).toString() + xmlLocClose +
            element[Object.keys(element)].map(m => { return '<xhtml:link rel="alternate" hreflang="' + m.MarketCode + '" href="https://' + m.relativeUrl + '" />' }).toString().replace(/,/g, ' ') +
            xmlLastmodOpen + moment().format("YYYY-MM-DDTHH:mm:ss.SSSZ") + xmlLastmodClose + xmlPriorityOpen + priority + xmlPriorityClose + xmlUrlClose
          );
        });
        var xmlReport = rootXMLOpen + this.siteMapXmlData.join('\n') + rootXMLClose;
        var blob = new Blob([xmlFormat(xmlReport)], { type: "text/xml" });
        saveAs(blob, this.xmlFileName);
      }
    })
    .catch(err => {
      console.log(err);
    })
}